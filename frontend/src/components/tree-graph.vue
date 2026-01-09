<template>
  <!-- SVG used as the root element for D3 visualizations -->
  <svg ref="svgRef"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { ref, watch } from "vue";
import type { GraphNode } from "@/model";

const props = defineProps<{
  data: GraphNode[];
  selectedNode: GraphNode | null;
}>();

const emit = defineEmits<{
  (e: "select", node: GraphNode): void;
}>();

const svgRef = ref<SVGSVGElement | null>(null);

// Convert data into hierarchical structure
function buildHierarchy(data: GraphNode[]) {
  if (!data || data.length === 0) return null;

  const map = new Map<string, unknown>();

  data.forEach(d => {
    map.set(d.name, { ...d, children: [] });
  });

  let root: unknown = null;
  data.forEach(d => {
    if (!d.parent) {
      root = map.get(d.name);
    } else {
      map.get(d.parent)?.children.push(map.get(d.name));
    }
  });

  return root;
}

function render() {
  if (!svgRef.value) return;
  if (!props.data || props.data.length === 0) return;

  const rootData = buildHierarchy(props.data);
  if (!rootData) return;
  d3.select(svgRef.value).selectAll("*").remove();

  const root = d3.hierarchy(rootData);

  const treeLayout = d3.tree<unknown>().size([500, 600]);
  treeLayout(root);
  const svg = d3.select(svgRef.value)
    .attr("width", 900)
    .attr("height", 500);

    svg.selectAll("line")
    .data(root.links())
    .enter()
    .append("line")
    .attr("x1", d => d.source.y)
    .attr("y1", d => d.source.x)
    .attr("x2", d => d.target.y)
    .attr("y2", d => d.target.x)
    .attr("stroke-width", 2)
    .attr("stroke", "#dcb17d");

  svg.selectAll("rect")
    .data(root.descendants())
    .enter()
    .append("rect")
    .attr("x", d => d.y)
    .attr("y", d => d.x - 25)
    .attr("width", 200)
    .attr("height", 50)
    .attr("rx", 12)
    .attr("fill", d =>
      props.selectedNode?.name === d.data.name ? "#cccc54" : "#dbf1a5"
    )
    .on("click", (_, d) => emit("select", d.data));

  svg.selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .attr("x", d => d.y + 15)
    .attr("y", d => d.x + 5)
    .on("click", (_, d) => emit("select", d.data))
    .text(d => d.data.name);
}

watch(
  () => props.data,
  (newData) => {
    if (newData.length) {
      render();
    }
  },
  { immediate: true }
);

watch(() => props.selectedNode, render);
</script>
