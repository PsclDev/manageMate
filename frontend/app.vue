<script setup lang="ts">
useHead({
  title: 'Manage Mate',
});
</script>

<template>
  <UApp>
    <div class="sm:mt-10 mt-5">
      <NuxtPage />
    </div>
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --font-family-sans: 'Poppins', sans-serif;
}

:root {
  --ui-text-select-bg: var(--color-red-500);
  --ui-text-select-fg: var(--color-white);
  --ui-bg: var(--color-red-50);
  --ui-bg-elevated: var(--color-red-50);
  --ui-border: var(--color-red-100);
  --tw-ring-color: var(--color-red-100);
}

.dark {
  --ui-bg: var(--color-zinc-950);
  --ui-bg-elevated: var(--color-zinc-950);
  --ui-border: var(--color-zinc-400);
  --ui-border: var(--color-zinc-900);
}

body {
  padding: 1.5rem;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);

  *::selection {
    background: var(--color-red-500);
    color: var(--color-white);
  }

  *::-moz-selection {
    background: var(--color-red-500);
    color: var(--color-white);
  }

  *::-webkit-selection {
    background: var(--color-red-500);
    color: var(--color-white);
  }
}
</style>
