<script setup>
import LogoWhite from '~/icons/logo/Stroke-White.vue'
</script>
<template>
   <footer class='w-full flex flex-col items-start justify-end min-h-screen pt-10 pb-2 gap-y-3 px-3 xl:max-w-7xl xl:mx-auto'>
  	<section class="w-full flex flex-col items-start justify-start gap-y-8 py-12 border-t border-gray-500/40">
  		<p class="text-pretty text-lg leading-6 max-w-2xl font-light md:text-xl">Si crees que encajaría bien en tu próximo proyecto, envíame un correo electrónico. Actualmente estoy disponible para trabajar como freelance/contratado.</p>
  		<a href="mailto:bdiez19@gmail.com" class="rounded-full bg-white text-black/90 px-5 py-1 md:text-lg transition-all ease-in-out duration-300 hover:bg-white/70">bdiez19@gmail.com</a>
  		<p class="font-display text-5xl font-black">LinuDev</p>
  	</section>
  	<section class="w-full grid grid-cols-2 border-y border-gray-500/40 divide-x divide-gray-500/40 [&>div]:py-12">
  		<div class="flex flex-col items-start justify-center gap-y-4">
  			<p class="md:text-xl pb-2">¡Aprende más de mi, y mi forma de trabajar!</p>
  			<a href="/about" class="scale-100 transition-all ease-in-out duration-300 hover:scale-110">Sobre mí  →</a>
  		</div>
      <div class="flex flex-col items-start justify-center gap-y-4 pl-6">
  			<p class="md:text-xl pb-2">Mira lo que he estado haciendo estos últimos días.</p>
  			<a href="/blog" class="scale-100 transition-all ease-in-out duration-300 hover:scale-110">Blog  →</a>
  		</div>
  	</section>
  	<section class="w-full flex items-center justify-center py-4 sm:py-12">
  		<p class="text-gray-500 w-full text-xs hidden sm:block">© 2023 Stealth Ltd. No Rights Reserved. </p>
  		<LogoWhite class='h-12 w-auto grow' />
  		<div class="w-full hidden sm:flex items-center justify-end gap-x-4">
  			<NuxtLink to="https://twitter.com/LinuDev" target="_blank" class="scale-100 transition-all ease-in-out duration-300 hover:scale-110">Twitter ↗︎</NuxtLink>
  			<NuxtLink to="https://www.linkedin.com/in/braiandiez/" target="_blank" class="scale-100 transition-all ease-in-out duration-300 hover:scale-110">LinkedIn ↗︎</NuxtLink>
  		</div>
  	</section>
  </footer>
</template>
