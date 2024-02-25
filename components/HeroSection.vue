<script setup>
import Arrow from '~/icons/Arrow.vue'
import Github from '~/icons/Github.vue'
import Twitter from '~/icons/Twitter.vue'
import Linkedin from '~/icons/Linkedin.vue'

const SOCIAL = [
  {
    icon: Github,
    name: 'Github',
    url: 'https://github.com/linuxmobile'
  },
  {
    icon: Twitter,
    name: 'Twitter',
    url: 'https://twitter.com/linudev'
  },
  {
    icon: Linkedin,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/braiandiez/'
  }
]

</script>
<template>
  <section class="grid grid-cols-1 pt-34 gap-y-3 lg:grid-cols-2">
    <h1 class="text-6xl font-display font-black max-w-xs lg:col-span-2 lg:text-8xl">Creative Developer</h1>
    <figure>
      <img src="/baires.webp" alt="Imagen de Buenos Aires, Obelisco" class="rounded-md object-cover w-full h-54 aspect-video"/>
      <figcaption class="text-sm font-light mt-1">Buenos Aires</figcaption>
    </figure>
    <div class="grid grid-cols-1 place-items-end gap-y-1 lg:content-end lg:pb-6">
      <h2 class="text-6xl font-display font-black lg:text-8xl">LinuDev</h2>
      <div class="grid grid-cols-3 gap-x-3">
        <a
          href="mailto:bdiez19@gmail.com"
          aria-label="Email"
          target="_blank" 
          class="flex items-center justify-center col-span-2 mx-3 bg-astro-blue rounded-lg py-2 text-white font-medium transition-colors duration-300 ease-in-out hover:bg-astro-blue/80"
        >Disponible para Contratar <Arrow/></a>
        <div class="flex items-center justify-end [&>a>svg]:size-6 gap-x-3">
          <NuxtLink v-for="social in SOCIAL" :key="social.name" :to="social.url" :aria-label="`${social.name} Link`" target="_blank" class="rounded-lg bg-white/10 p-2 hover:bg-white/20">
            <component :is="social.icon" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
