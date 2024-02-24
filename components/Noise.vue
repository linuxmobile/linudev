<template>
  <svg
    class='pointer-events-none fixed isolate z-10 opacity-90 mix-blend-soft-light h-100dvh w-full'>
    <filter id='pedroduarteisalegend'>
      <feTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'></feTurbulence>
    </filter>
    <rect width='100%' height='100%' filter='url(#pedroduarteisalegend)'></rect>
  </svg>
  <div class="fixed w-full h-24 bg-astro-blue/80 blur-[150px]"></div>
</template>
