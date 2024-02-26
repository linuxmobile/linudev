<template>
  <div v-if="data && !error" >
    <div class="flex flex-col items-start justify-center text-center mb-4 gap-y-2">
      <NuxtLink to="https://github.com/linuxmobile" aria-label="Github Profile Link" target="_blank" class="flex items-center justify-center gap-x-2">
        <Github class="rounded-full p-1 size-10 bg-white/10"/>
        <span class="font-bold">✦</span>
        <NuxtImg :src="data.avatarUrl" alt="Avatar" class="mx-auto rounded-full size-10" width="80" height="80"/>
        <h2 class="text-xl font-semibold">{{ data.name }}</h2>
      </NuxtLink>
      <p>{{ currentYear }}: {{ data.totalContributions }} Contributions</p>
    </div>
    <ul class="grid grid-cols-[repeat(53,13.1333px)] gap-1 justify-items-start">
      <li v-for="month in months" :key="month.name" :class="`col-span-${month.weeks}`" :style="{ 'grid-column-start': month.start }">{{ month.name }}</li>
    </ul>
    <ul class="grid auto-cols-fr grid-flow-col grid-rows-7 gap-1 max-w-max">
      <li class="bg-transparent"></li>
      <li v-for="day in data.contributions" :key="day.date" class="size-3.5 aspect-square rounded-sm" :style="{ background: getColor(day.contributionLevel) }"></li>
    </ul>
  </div>
</template>
<script setup>
import Github from '~/icons/Github.vue'
const { data, error, pending } = useFetch('/api/github')

const currentYear = ref(new Date().getFullYear())

const months = [
  { name: 'Ene', weeks: 5 },
  { name: 'Feb', weeks: 4 },
  { name: 'Mar', weeks: 5 },
  { name: 'Abr', weeks: 4 },
  { name: 'May', weeks: 5 },
  { name: 'Jun', weeks: 4 },
  { name: 'Jul', weeks: 5 },
  { name: 'Ago', weeks: 5 },
  { name: 'Sep', weeks: 4 },
  { name: 'Oct', weeks: 5 },
  { name: 'Nov', weeks: 4 },
  { name: 'Dic', weeks: 2 },
];

watch(error, (newError) => {
  if (newError) {
    console.error('Error:', newError);
  }
});

watch(pending, (newPending) => {
  console.log('Pending:', newPending);
});


function getColor(contributionLevel) {
  switch (contributionLevel) {
    case 'NONE':
      return '#1F1D2E';
    case 'FIRST_QUARTILE':
      return '#351856';
    case 'SECOND_QUARTILE':
      return '#630DAB';
    case 'THIRD_QUARTILE':
      return '#9000FF';
    case 'FOURTH_QUARTILE':
      return '#FF19F4';
    default:
      return '#FF19F4';
  }
}
</script>
