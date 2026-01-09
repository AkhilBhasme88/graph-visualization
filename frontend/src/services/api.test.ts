import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchGraphData } from "./api";

vi.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchGraphData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    import.meta.env.VITE_API_BASE_URL = "http://localhost:4000";
  });

  it("returns graph data on success", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: [
          { name: "A", description: "desc", parent: "" }
        ]
      }
    } as any);

    const result = await fetchGraphData();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("A");
  });

  it("throws error for invalid API response format", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {}
    } as any);

    await expect(fetchGraphData()).rejects.toThrow(
      "Invalid API response format"
    );
  });

  it("throws error when API base URL is missing", async () => {
    import.meta.env.VITE_API_BASE_URL = "";
    await expect(fetchGraphData()).rejects.toThrow(
      "API base URL is not configured"
    );
  });

  it("throws generic error for unknown failures", async () => {
    mockedAxios.get.mockRejectedValueOnce("unexpected");
    await expect(fetchGraphData()).rejects.toThrow("Failed to fetch graph data");
  });
});
