<script setup>
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>
<template>
  <main class="pt-34 px-4 xl:max-w-7xl mx-auto grid grid-cols-1 gap-y-8">
    <ContentQuery :path="$route.path" find="one" v-slot="{ data }">
      <ContentRenderer :value="data">
        <header>
          <h1 class="text-5xl font-medium font-display ">{{data.title}}</h1>
          <p class="font-medium opacity-70 line-clamp-3">{{data.description}}</p>
          <p class="text-sm opacity-60">{{ formatDate(data.date) }}</p>
        </header>
        <ContentRendererMarkdown :value="data" class="prose-sm"/>
      </ContentRenderer>
    </ContentQuery>
  </main>
</template>