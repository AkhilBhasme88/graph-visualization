import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import TreeGraph from "./tree-graph.vue";
import type { GraphNode } from "@/model";
import { nextTick } from "vue";

let capturedClickHandler: ((_: unknown, d: any) => void) | null = null;

vi.mock("d3", () => {
  const selection = {
    selectAll: vi.fn().mockReturnThis(),
    data: vi.fn().mockReturnThis(),
    enter: vi.fn().mockReturnThis(),
    append: vi.fn().mockReturnThis(),
    attr: vi.fn().mockReturnThis(),
    text: vi.fn().mockReturnThis(),
    remove: vi.fn().mockReturnThis(),
    on: vi.fn((event, handler) => {
      if (event === "click") {
        capturedClickHandler = handler;
      }
      return selection;
    })
  };

  return {
    select: vi.fn(() => selection),
    hierarchy: vi.fn((data) => ({
      data,
      descendants: () => [
        { x: 10, y: 20, data },
      ],
      links: () => [
        {
          source: { x: 0, y: 0 },
          target: { x: 10, y: 10 }
        }
      ]
    })),

    tree: vi.fn(() => {
      const fn = ((root: unknown) => root) as any;
      fn.size = vi.fn().mockReturnValue(fn);
      return fn;
    })
  };
});


describe("TreeGraph.vue", () => {
  const graphData: GraphNode[] = [
    { name: "A", description: "Root", parent: "" },
    { name: "B", description: "Child", parent: "A" }
  ];

  beforeEach(() => {
    capturedClickHandler = null;
    vi.clearAllMocks();
  });

  it("renders svg element", () => {
    const wrapper = mount(TreeGraph, {
      props: {
        data: [],
        selectedNode: null
      }
    });

    expect(wrapper.find("svg").exists()).toBe(true);
  });

  it("renders graph when data is provided", () => {
    const wrapper = mount(TreeGraph, {
      props: {
        data: graphData,
        selectedNode: null
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("re-renders when selectedNode changes", async () => {
    const wrapper = mount(TreeGraph, {
      props: {
        data: graphData,
        selectedNode: null
      }
    });

    await wrapper.setProps({
      selectedNode: graphData[0]
    });
    expect(wrapper.exists()).toBe(true);
  });

 it("emits select event when node is clicked", async () => {
    const wrapper = mount(TreeGraph, {
      props: {
        data: [],
        selectedNode: null
      }
    });
    await wrapper.setProps({
      data: graphData
    });

    await nextTick();
    capturedClickHandler?.(null, { data: graphData[1] });
    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")?.[0][0]).toEqual(graphData[1]);
  });
});
