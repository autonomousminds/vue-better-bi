<script setup lang="ts">
defineProps<{
  ascending?: boolean;
}>();
</script>

<template>
  <span class="sort-icon">
    <svg
      :class="{ 'sort-asc': ascending === true, 'sort-desc': ascending === false }"
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="currentColor"
    >
      <path v-if="ascending" d="M4 0L7.5 5H0.5L4 0Z" />
      <path v-else d="M4 10L0.5 5H7.5L4 10Z" />
    </svg>
  </span>
</template>

<style scoped>
.sort-icon {
  display: inline-flex;
  align-items: center;
  margin-left: 2px;
  opacity: 0.7;
}
</style>
