<script setup>
const { toc } = useContent()
const route = useRoute()
const article = await queryContent('blog').where({_path: route.path}).findOne();

useSeoMeta({
  title: article.title,
  description: article.description,
  ogTitle: article.title,
  ogDescription: article.description,
  ogType: 'article',
  twitterTitle: article.title,
  twitterDescription: article.description
})

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

defineOgImageComponent(
  'BlogPost',
  {
    title: article.title,
    description: article.description,
    date: formatDate(article.date)
  }
)

</script>
<template>
  <main class="pt-34 px-4 xl:max-w-7xl mx-auto grid grid-cols-1 gap-x-3 gap-y-8">
    <ContentQuery :path="$route.path" find="one" v-slot="{ data }">
      <ContentRenderer :value="data" class="grid grid-cols-8">
        <header class="col-span-8">
          <h1 class="text-5xl font-medium font-display ">{{data.title}}</h1>
          <p class="font-medium opacity-70 line-clamp-3">{{data.description}}</p>
          <p class="text-sm opacity-60">{{ formatDate(data.date) }}</p>
        </header>
        <ContentRendererMarkdown :value="data" class="prose-sm text-sm md:text-md lg:text-lg col-span-4 max-w-max"/>
        <ul v-if="toc && toc.links" class="col-span-4 pt-16 sticky top-15 max-h-[40vh] overflow-y-auto">
          <li v-for="link in toc.links" :key="link.text">
            <a :href="`#${link.id}`" class="text-xl text-[#ECAB43]">
              {{ link.text }}
            </a>
          </li>
        </ul>
      </ContentRenderer>
    </ContentQuery>
  </main>
</template>
