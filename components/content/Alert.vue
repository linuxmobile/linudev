<script setup lang="ts">
defineProps(['type'])
</script>
<template>
  <div>
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>
