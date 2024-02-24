<script setup>
const links = [{
  label: 'Inicio',
  to: '/'
}, {
  label: 'Blog',
  to: '#'
}, {
  label: 'Sobre Mi',
  to: '#'
}]
</script>
<template>
  <Noise />
  <header class="fixed w-full py-6 text-lg">
    <nav class="flex-center gap-x-12">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
  <slot />
</template>
