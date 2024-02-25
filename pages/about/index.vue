<script setup>
import Html from '~/components/icons/Html.vue'
import Css from '~/components/icons/Css.vue'
import Js from '~/components/icons/Js.vue'
import Ts from '~/components/icons/Ts.vue'
import React from '~/components/icons/React.vue'
import Sass from '~/components/icons/Sass.vue'
import Unocss from '~/components/icons/Unocss.vue'
import Vue from '~/components/icons/Vue.vue'
import Tailwind from '~/components/icons/Tailwind.vue'
import Astro from '~/components/icons/Astro.vue'
import Next from '~/components/icons/Next.vue'
import Bootstrap from '~/components/icons/Bootstrap.vue'
import Nuxt from '~/components/icons/Nuxt.vue'
import Vscode from '~/components/icons/Vscode.vue'
import Git from '~/components/icons/Git.vue'
import Bash from '~/components/icons/Bash.vue'
import Linux from '~/components/icons/Linux.vue'
import Nix from '~/components/icons/Nix.vue'
import Figma from '~/components/icons/Figma.vue'
import Penpot from '~/components/icons/Penpot.vue'
import Krita from '~/components/icons/Krita.vue'
import Gimp from '~/components/icons/Gimp.vue'
import Inkscape from '~/components/icons/Inkscape.vue'

const TECHS = {
  FRONTEND: {
    name: 'Frontend',
    icons: [Html, Css, Js, Ts, React, Sass, Unocss, Vue]
  },
  FRAMEWORKS: {
    name: 'Frameworks',
    icons: [Tailwind, Astro, Next, Bootstrap, Nuxt]
  },
  TOOLS: {
    name: 'Herramientas',
    icons: [Vscode, Git, Bash, Linux, Nix, Figma, Penpot, Krita, Gimp, Inkscape]
  }
};
</script>
<template>
  <main class="px-4 pt-34 xl:max-w-7xl mx-auto grid grid-cols-1 gap-y-20">
    <section class="grid grid-cols-3 gap-x-5">
      <h1 class="text-3xl font-black font-display">Sobre Mi</h1>
      <article class="grid gap-y-5 text-pretty col-span-2 [&>p>strong]:text-[#ea9d34] [&>p>strong]:font-semibold">
        <p>
          Desde mi perspectiva única, veo el mundo del desarrollo web como un vasto lienzo en blanco,
          esperando ser transformado en una obra maestra. <strong>Mi condición de autista no es una limitación,
          sino una fortaleza</strong> que me permite enfocarme en los detalles más pequeños,
          esos que a menudo hacen la diferencia entre lo ordinario y lo extraordinario.
        </p>
        <p>
          Mi objetivo es siempre dejar a los clientes absolutamente asombrados, asegurándome de que cada pixel
          y cada línea de código contribuyan a una <strong>experiencia sin precedentes</strong>. Para mí,
          el éxito se mide por la capacidad de provocar esa expresión de asombro en el rostro de mis clientes,
          una señal de que he logrado superar sus expectativas más salvajes.
        </p>
    </article>
    </section>
    <section class="grid gap-y-8">
      <h2 class="uppercase tracking-widest font-light text-2xl font-display">Tecnologías que domino</h2>
      <div v-for="(category, key) in TECHS" :key="key" class="grid gap-y-2">
        <h3 class="uppercase font-semibold">{{ category.name }}</h3>
        <div class="flex justify-start gap-x-1 gap-y-2 flex-wrap">
          <component
            v-for="(IconComponent, index) in category.icons" 
            :key="index" 
            :is="IconComponent"
            class="bg-gradient-to-tr from-astro-blue to-astro-pink text-white rounded-full p-2 aspect-square size-10"
          />
        </div>
      </div>
    </section>
  </main>
</template>
