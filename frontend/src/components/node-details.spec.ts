import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import NodeDetails from "./node-details.vue";
import type { GraphNode } from "@/model";

vi.mock("../assests/close.svg", () => ({
  default: "close-icon.svg"
}));

describe("NodeDetails.vue", () => {
  const mockNode: GraphNode = {
    name: "Node A",
    description: "This is a test node",
    parent: ""
  };

  it("does not render sidebar when node is null", () => {
    const wrapper = mount(NodeDetails, {
      props: {
        node: null
      }
    });

    expect(wrapper.find("aside").exists()).toBe(false);
  });

  it("renders sidebar when node is provided", () => {
    const wrapper = mount(NodeDetails, {
      props: {
        node: mockNode
      }
    });

    expect(wrapper.find("aside").exists()).toBe(true);
  });

  it("renders node name and description", () => {
    const wrapper = mount(NodeDetails, {
      props: {
        node: mockNode
      }
    });

    expect(wrapper.text()).toContain(mockNode.name);
    expect(wrapper.text()).toContain(mockNode.description);
  });

  it("renders close icon image with correct src and alt", () => {
    const wrapper = mount(NodeDetails, {
      props: {
        node: mockNode
      }
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("close-icon.svg");
  });

  it("emits clear event when close button is clicked", async () => {
    const wrapper = mount(NodeDetails, {
      props: {
        node: mockNode
      }
    });

    await wrapper.find("button.close-btn").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("clear");
    expect(wrapper.emitted("clear")?.length).toBe(1);
  });
});
