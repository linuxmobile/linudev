<template>
  <section class="grid gap-y-4">
    <h3 class="text-5xl font-bold font-display max-w-xs lg:text-8xl">Proyectos Seleccionados</h3>
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <ProjectLoading v-if="isLoading" />
      <article
        v-if="visibleProjects.length > 0"
        v-for="project in visibleProjects"
        :key="project.repo"
        class="h-56 flex flex-col items-start justify-between bg-white/5 border border-white/10 px-4 py-3 rounded-lg gap-y-2"
      >
        <header class="w-full flex items-center justify-between">
          <h2 class="font-black text-lg font-display lg:text-2xl" v-if="project.title">{{ project.title }}</h2>
          <h2 class="font-black text-lg font-display lg:text-2xl" v-else>{{project.repo}}</h2>
          <div class="flex items-center justify-center gap-x-1">
            <NuxtLink
              v-if="project.showSite"
              :to="project.homepage"
              :aria-label="`${project.title} Site Link`"
              target="_blank"
              class="rounded-full bg-white/10 p-1.5 hover:bg-white/20"
            ><Link class="size-5 lg:size-6"/></NuxtLink>
            <NuxtLink
              :to="project.html_url"
              :aria-label="`${project.title} Github Link`"
              target="_blank"
              class="rounded-full bg-white/10 p-1.5 hover:bg-white/20"
            ><Github class="size-5 lg:size-6"/></NuxtLink>
          </div>
        </header>
        <p class="max-w-80 text-gray-300 lg:text-lg lg:max-w-lg">{{ project.description }}</p>
        <footer class="flex items-end justify-between w-full">
          <div v-if="visibleProjects.length > 0" class="flex gap-x-1">
            <div v-if="project.tags" v-for="tag in project.tags" :key="tag.name" class="pointer-events-none flex items-center rounded-md px-2 py-1 text-xs gap-x-1 font-medium" :class="tag.class">
              <component :is="tag.icon" class="size-5 inline-block"/>
              <span>{{ tag.name }}</span>
            </div>
          </div>
          <div class="flex items-center justify-center gap-x-1 [&>p>svg]:inline-block">
            <p v-if="project.forks"><Fork /> {{ project.forks }}</p>
            <p v-if="project.stars"><Star/> {{ project.stars }}</p>
          </div>
        </footer>
      </article>
      <div
        v-if="projectInfos.length > 0"
        class="flex items-center justify-between gap-x-4 w-full lg:col-start-2
        [&>button]:rounded-md [&>button]:bg-white/5 [&>button]:px-3 [&>button]:py-1 [&>button]:w-full"
      >
        <button :class="{'opacity-50': currentPage === 0}" @click="prevPage" :disabled="currentPage === 0">Anterior</button>
        <button :class="{'opacity-50': (currentPage + 1) * pageSize >= projectInfos.length}" @click="nextPage" :disabled="(currentPage + 1) * pageSize >= projectInfos.length">Siguiente</button>
      </div>
    </div>
  </section>
</template>
<script setup>
import NextRaw from '~/icons/techs/Next.vue'
import AstroRaw from '~/icons/techs/Astro.vue'
import ReactRaw from '~/icons/techs/React.vue'
import TypescriptRaw from '~/icons/techs/Typescript.vue'
import JavascriptRaw from '~/icons/techs/Javascript.vue'
import UnocssRaw from '~/icons/techs/Unocss.vue'
import TailwindRaw from '~/icons/techs/Tailwind.vue'
import NuxtRaw from '~/icons/techs/Nuxt.vue'
import NixRaw from '~/icons/techs/Nix.vue'
import CssRaw from '~/icons/techs/Css.vue'

const Next = markRaw(NextRaw)
const Astro = markRaw(AstroRaw)
const React = markRaw(ReactRaw)
const Typescript = markRaw(TypescriptRaw)
const Javascript = markRaw(JavascriptRaw)
const Unocss = markRaw(UnocssRaw)
const Tailwind = markRaw(TailwindRaw)
const Nuxt = markRaw(NuxtRaw)
const Nix = markRaw(NixRaw)
const Css = markRaw(CssRaw)

import Star from '~/icons/Star.vue'
import Link from '~/icons/Link.vue'
import Github from '~/icons/Github.vue'
import Fork from '~/icons/Share.vue'

const TAGS = {
  NEXT: {
    name: 'Next.js',
    icon: Next,
    class: 'bg-black text-white',
  },
  REACT: {
    name: 'React',
    icon: React,
    class: 'bg-sky-400 text-white',
  },
  UNOCSS: {
    name: 'Unocss',
    icon: Unocss,
    class: 'bg-gray-800 text-white',
  },
  TAILWIND: {
    name: 'Tailwind CSS',
    icon: Tailwind,
    class: 'bg-cyan-800/70 text-white',
  },
  ASTRO: {
    name: 'Astro',
    icon: Astro,
    class: 'bg-white text-gray-900',
  },
  JAVASCRIPT: {
    name: 'Javascript',
    icon: Javascript,
    class: 'bg-yellow-700 text-gray-900',
  },
  TYPESCRIPT: {
    name: 'Typescript',
    icon: Typescript,
    class: 'bg-blue-800/70 text-white',
  },
  NUXT: {
    name: 'Nuxt',
    icon: Nuxt,
    class: 'bg-green-500/70 text-white',
  },
  NIX: {
    name: 'Nix',
    icon: Nix,
    class: 'bg-gray-800 text-white',
  },
  CSS: {
    name: 'Css',
    icon: Css,
    class: 'bg-blue-600/70 text-white',
  },
}

const PROJECTS = [
  {
    repo: 'kaku',
    title: '革 | kaku',
    description: 'Configuración de NixOS modular y reproducible e inmutable, facilitando una adaptación sencilla y una experiencia de usuario optimizada con las herramientas más solicitadas.',
    tags: [TAGS.NIX]
  },
  {
    repo: 'palettePilot',
    title: 'Palette Pilot',
    description: 'Herramienta que extrae paletas de 5 colores de tus imágenes, evalúa el contraste para web y te permite exportar en formatos como Tailwind, PNG, SVG y variables CSS',
    tags: [TAGS.NUXT, TAGS.TYPESCRIPT],
    showSite: true
  },
  {
    repo: 'SilentFox',
    title: 'SilentFox',
    description: 'Un tema minimalista para Firefox que prioriza tu contenido. Diseñado con puro CSS, redefine tu navegación enfocándose en la funcionalidad',
    tags: [TAGS.CSS]
  },
  {
    repo: 'bluesky-clone',
    title: 'Bluesky Clone',
    description: 'Un clon de Twitter desarrollado con la potencia de Next.js y Supabase, donde la velocidad y la facilidad de uso cobran vida',
    tags: [TAGS.NEXT, TAGS.UNOCSS]
  },
  {
    repo: 'hyprland-dots',
    description: 'Configuración de Arch Linux que ha capturado la atención de la comunidad por su innovación y diseño excepcional'
  },
  {
    repo: 'midu.dev',
    description: 'Un rediseño audaz y moderno de la página del reconocido streamer midudev, reimaginado para capturar la esencia de la innovación y la comunidad tech',
    tags: [TAGS.ASTRO, TAGS.TAILWIND],
    showSite: true,
  },
  {
    repo: 'ninogordo',
    title: 'El Niño Gordo',
    description: 'Un rediseño vanguardista de la web de una destacada empresa de comidas asiáticas, donde la tradición se encuentra con el modernismo en cada click',
    tags: [TAGS.NEXT, TAGS.UNOCSS],
  },
  {
    repo: 'larural',
    title: 'La Rural',
    description: 'Un rediseño web que revitaliza el icónico espacio de eventos y ferias de Argentina, fusionando tradición y tecnología para una experiencia inolvidable.',
    tags: [TAGS.ASTRO, TAGS.UNOCSS],
    showSite: true,
  },
  {
    repo: 'linews',
    title: 'LiNews',
    description: 'Noticias actualizadas directamente desde la API de dev.to',
    tags: [TAGS.JAVASCRIPT, TAGS.ASTRO, TAGS.TAILWIND],
    showSite: true,
  },
  {
    repo: 'prrr',
    title: 'Prrr!',
    description: 'Es la landing page de un coffee store único que ofrece la experiencia de disfrutar de un excelente café en compañía de gatitos terapéuticos, ideal para los amantes del café y los animales.',
    tags: [TAGS.CSS],
    showSite: true,
  },
  {
    repo: 'linuland',
    title: 'LinuLand',
    description: 'Es mi primera creación en el mundo del diseño web: una landing page que funciona como portfolio personal, inspirada en la vibrante y nutritiva palta, reflejada en cada color y detalle.',
    showSite: true,
  },
  {
    repo: 'dwm-dots',
    title: 'DWM dotfiles',
    description: 'Representa mis inicios en la personalización de Linux, siendo la primera configuración que realicé para dwm en Arch, marcando el comienzo de mi viaje en la optimización de entornos de escritorio.',
  }
]

const projectInfos = ref([]);

const currentPage = ref(0);
const pageSize = 4;
const visibleProjects = ref([]);

function updateVisibleProjects() {
  const start = currentPage.value * pageSize;
  const end = start + pageSize;
  visibleProjects.value = projectInfos.value.slice(start, end);
}

function nextPage() {
  if ((currentPage.value + 1) * pageSize < projectInfos.value.length) {
    currentPage.value++;
    updateVisibleProjects();
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
    updateVisibleProjects();
  }
}

const isLoading = ref(true);

function sortProjects() {
  projectInfos.value.sort((a, b) => {
    if (b.stars - a.stars !== 0) {
      return b.stars - a.stars;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });
}

async function fetchProjectsInfo() {
  const projectFetchPromises = PROJECTS.map(project =>
    $fetch(`/api/github/${encodeURIComponent(project.repo)}`).then(projectData => ({
      ...project,
      stars: projectData.stars,
      forks: projectData.forks,
      html_url: projectData.html_url,
      created_at: projectData.created_at,
      homepage: projectData.homepage,
    })).catch(error => {
      console.error(`Error fetching data for ${project.repo}:`, error);
      return null;
    })
  );

  const fetchedProjects = await Promise.all(projectFetchPromises);
  projectInfos.value = fetchedProjects.filter(project => project !== null);
  sortProjects();
  updateVisibleProjects();
  isLoading.value = false;
}

onMounted(fetchProjectsInfo);
</script>
