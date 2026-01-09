import request from "supertest";
import { describe, it, expect, vi, afterEach } from "vitest";

// Helper to reset module cache between tests
const loadApp = async () => {
  const mod = await import("../server");
  return mod.default;
};

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe("GET /api/graph – coverage tests", () => {
  it("returns 200 with valid graph data", async () => {
    vi.doMock("../data", () => ({
      graphData: [
        { name: "A", description: "desc", parent: "" }
      ]
    }));

    const app = await loadApp();
    const res = await request(app).get("/api/graph");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("returns 400 when graph data format is invalid", async () => {
    vi.doMock("../data", () => ({
      graphData: [
        { name: "A", parent: "" } // ❌ missing description
      ]
    }));

    const app = await loadApp();
    const res = await request(app).get("/api/graph");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid graph data format");
  });

  it("returns 404 when graph data is undefined", async () => {
    vi.doMock("../data", () => ({
      graphData: undefined
    }));

    const app = await loadApp();
    const res = await request(app).get("/api/graph");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Graph data not found");
  });

  it("returns 500 when unexpected error occurs", async () => {
    vi.doMock("../data", () => ({
      get graphData() {
        throw new Error("Data load failure");
      }
    }));

    const app = await loadApp();
    const res = await request(app).get("/api/graph");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal Server Error");
  });
});
