import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { graphData } from "./data";
import { GraphNode } from "./model";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Utility: validate graph data
const isValidGraphData = (data: GraphNode[]): boolean => {
  return Array.isArray(data) && data.every(
    (node) =>
      typeof node.name === "string" &&
      typeof node.description === "string" &&
      typeof node.parent === "string"
  );
};

// GET /api/graph
app.get("/api/graph", (_req: Request, res: Response, next: NextFunction) => {
  try {
    if (!graphData) {
      return res.status(404).json({ message: "Graph data not found" });
    }

    if (!isValidGraphData(graphData)) {
      return res.status(400).json({ message: "Invalid graph data format" });
    }

    res.status(200).json({ data: graphData });
  } catch (error) {
    next(error);
  }
});

// Global error handler
app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error("Server Error:", err.message);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
);

// Start server only if not in test mode
const PORT = 4000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
