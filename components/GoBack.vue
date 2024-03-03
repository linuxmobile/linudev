<script setup>
const router = useRouter();
const route = useRoute();

const isRootRoute = ref(route.path === '/');
watch(() => route.path, (newPath) => {
  isRootRoute.value = newPath === '/';
});

const buttonText = ref('');
const buttonAction = ref(() => {});

const setButtonProperties = (path) => {
  if (path !== '/' && path.startsWith('/blog/') && path !== '/blog') {
    buttonText.value = '/Blog';
    buttonAction.value = () => { router.push('/blog'); };
  } else if (path === '/blog') {
    buttonText.value = '/Home';
    buttonAction.value = () => { router.push('/'); };
  } else {
    buttonText.value = 'Back';
    buttonAction.value = () => { router.back(); };
  }
};

setButtonProperties(route.path);

watch(() => route.path, (newPath) => {
  setButtonProperties(newPath);
}, { immediate: true });

</script>

<template>
  <div class="hidden xl:block absolute xl:top-35 xl:left-10 2xl:left-60" v-if="!isRootRoute">
    <button @click="buttonAction()" class="relative group bg-gray-500/40 p-3 rounded-full opacity-20 transition-all ease-in-out duration-400 hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" class="size-8"><path fill="currentColor" d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8"></path></svg>
        <div class="invisible absolute top-16 left-0 mb-3 min-w-20 max-w-sm rounded-md bg-gray-500/30 px-4 py-2 text-sm group-hover:visible opacity-80">
          <p class="leading-2 py-2 font-semibold text-white">{{buttonText}}</p>
        </div>
    </button>
  </div>
</template>
