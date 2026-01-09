import axios from "axios";
import type { GraphNode } from "@/model";

export async function fetchGraphData(): Promise<GraphNode[]> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API base URL is not configured");
  }

  try {
    const response = await axios.get(`${baseUrl}/api/graph`);
    if (
      !response ||
      !response.data ||
      !Array.isArray(response.data.data)
    ) {
      throw new Error("Invalid API response format");
    }
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch graph data: ${error.message}`);
    }
    throw new Error("Failed to fetch graph data");
  }
}
