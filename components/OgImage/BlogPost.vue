<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description: string
  date?: string
}>(), {
  title: 'title',
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center bg-black text-white relative">
    <img src="/dist.png" class="object-cover absolute opacity-70">
    <div class="flex items-start justify-start h-full px-10 pt-12">
      <div class="flex flex-col justify-between w-full h-full">
        <p class="text-2xl font-bold opacity-40">
          {{ date }}
        </p>
        <h1 class="text-[80px] font-black text-left">
          {{ title }}
        </h1>
        <p class="text-2xl font-bold opacity-60">
          {{ description }}
        </p>
        <div class="flex w-full items-center justify-center pb-4">
          <img src="/profile.png" class="size-10">
          <p class="font-medium pl-3">linu.dev</p>
        </div>
      </div>
    </div>
  </div>
</template>
