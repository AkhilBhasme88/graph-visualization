<template>
  <div class="layout">
    <!-- data Tree graph -->
    <TreeGraph
      :data="data"
      :selectedNode="selectedNode"
      @select="selectedNode = $event"
    />
    <!-- displaying selected node details -->
    <NodeDetails
      :node="selectedNode"
      @clear="selectedNode = null"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchGraphData } from "./services/api";
import type { GraphNode } from "@/model";
import TreeGraph from "./components/tree-graph.vue";
import NodeDetails from "./components/node-details.vue";

const data = ref<GraphNode[]>([]);
//currently selected node
const selectedNode = ref<GraphNode | null>(null);

onMounted(async () => {
  // Load graph data from backend and update data ref
  data.value = await fetchGraphData();
});
</script>

<style>
.layout {
  display: flex;
}
</style>
