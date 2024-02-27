<script setup>
const title = ref('LinuDev - Un blog sobre programación para novatos')
const description = ref('Un blog sobre programación para novatos, javascript, react, rust, bash, y sobre todo linux.')

defineOgImageComponent(
  'BlogPost',
  {
    title: title,
    description: description,
  }
)

const faviconHref = ref('/logo/stroke-black.svg'); // Valor predeterminado

onMounted(() => {
  const updateFavicon = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      faviconHref.value = '/logo/stroke-white.svg';
    } else {
      faviconHref.value = '/logo/stroke-black.svg';
    }
  };

  updateFavicon();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
});

useHead({
  bodyAttrs: {
    class: 'bg-black text-white font-sans'
  },
  link: [{rel: 'icon', type: 'image/svg+xml', href: faviconHref }]
})

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  lang: 'es',
  icon: '/favicon.svg'
})

const links = [{
  label: 'Inicio',
  to: '/'
}, {
  label: 'Blog',
  to: '/blog'
}, {
  label: 'Sobre Mi',
  to: '/about'
}]

</script>
<template>
  <NuxtLoadingIndicator />
  <div>
    <Noise />
    <header class="fixed w-full py-6 text-lg bg-gradient-to-b from-black via-black/60 to-transparent">
      <nav class="w-full flex-center gap-x-12 md:justify-end md:px-6">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </header>
  </div>
  <NuxtPage />
  <FooterSection />
</template>
<style>
@font-face {
  font-family: 'Clash Display';
  src: url('/ClashDisplay-Variable.woff2') format('woff2');
  font-weight: 200 900;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'General Sans';
  src: url('/GeneralSans-Variable.woff2') format('woff2');
  font-weight: 200 900;
  font-display: swap;
  font-style: normal;
}
</style>
