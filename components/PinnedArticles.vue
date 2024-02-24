<script setup>
import { format, register } from 'timeago.js'

const { data: pinnedArticles } = await useAsyncData('pinnedArticles', () => queryContent('blog').where({ isPinned: true }).find())

const localeFunc = (number, index, totalSec) => {
  return [
    ['justo ahora', 'ahora mismo'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'en %s horas'],
    ['hace 1 día', 'en 1 día'],
    ['hace %s días', 'en %s días'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['hace 1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años']
  ][index];
};

register('es', localeFunc);

const formatTimeAgo = (date) => {
  return format(date, 'es')
}

</script>
<template>
  <section class="grid gap-y-4">
    <h3 class="font-display text-5xl font-black">Artículos Fijados</h3>
    <article v-for="article in pinnedArticles" :key="article._path" class="rounded-lg bg-white/5 border border-white/10">
      <NuxtLink :to="article._path" class="px-4 py-3 w-full block flex flex-col gap-y-2">
        <h2 class="font-display font-black text-2xl">{{ article.title }}</h2>
        <p class="text-gray-300 font-medium line-clamp-2">{{ article.description }}</p>
        <p class="text-gray-400 text-sm">{{ formatTimeAgo(new Date(article.date)) }}</p>
      </NuxtLink>
    </article>
  </section>
</template>
