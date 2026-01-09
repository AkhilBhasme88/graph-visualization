<template>
  <!-- Sidebar panel shown only when a node is selected -->
  <aside v-if="node" class="sidebar">
    <button class="close-btn" @click="emit('clear')" aria-label="Close">
      <img :src="closeIcon" alt="Close" />
    </button>
    <h3>{{ node.name }}</h3>
    <p>{{ node.description }}</p>
  </aside>
</template>

<script setup lang="ts">
import type { GraphNode } from "@/model";
import closeIcon from "../assests/close.svg";

defineProps<{
  node: GraphNode | null;
}>();

const emit = defineEmits(["clear"]);
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 150px;
  border: 1px solid #f47b7b;
  padding: 12px;
}
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  float: right;
}
.close-btn img {
  width: 24px;
  height: 24px;
}
</style>
