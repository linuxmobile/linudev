<script setup lang="ts">

const props = defineProps({
  count: {type: Number, required: true},
  page: {type: Number, required: true},
  limit: {type: Number, required: true}
});

const route = useRoute();
const tag = route.query.tag;

const prevLink = () => {
  let link = "/blog";
  if(props.page > 2) {
    link = link + `/${props.page - 1}`;
  }
  if(tag) {
    link = link + "?tag=" + tag;
  }
  return link;
}

const nextLink = () => {
  if(tag) {
    return `/blog/${props.page + 1}?tag=${tag}`
  } else {
    return `/blog/${props.page + 1}`;
  }
}

const toCount = () => {
  if(props.count < props.limit * props.page) {
    return props.count;
  } else {
    return props.limit * props.page;
  }
}
</script>
<template>
  <nav>
    <div>
      <p>
        Mostrando
        <span class="font-medium">{{props.page > 1 ? (props.page -1) * props.limit : 1}}</span>
        de
        <span class="font-medium">{{toCount()}}</span>
        De
        <span class="font-medium">{{ props.count }}</span>
        resultados
      </p>
    </div>
    <div class="flex items-center justify-between gap-x-4 [&>a]:rounded-md [&>a]:bg-white/5 [&>a]:px-3 [&>a]:py-1 [&>a]:w-full">
      <a :href="props.page > 1 ? prevLink() : null"
         @click="props.page === 1 && $event.preventDefault()"
         :class="{ 'cursor-not-allowed opacity-50': props.page === 1 }">
        Anterior
      </a>
      <a :href="(props.page * props.limit) < props.count ? nextLink() : null"
         @click="(props.page * props.limit) >= props.count && $event.preventDefault()"
         :class="{ 'cursor-not-allowed opacity-50': (props.page * props.limit) >= props.count }">
        Siguiente
      </a>
    </div>
  </nav>
</template>
