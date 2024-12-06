<script lang="ts" setup>
defineProps<{
  title: string;
  onConfirm: () => void;
}>();

const modal = useModal();
</script>

<template>
  <UModal
    title="Delete Contract"
    close-icon="octicon:x-16"
    :ui="{ content: 'bg-red-50 dark:bg-zinc-950 shadow-mds', footer: 'justify-end' }"
  >
    <slot name="opener" />

    <template #body>
      <slot>
        Are you sure you want to delete '{{ title }}'?
      </slot>
    </template>
    <template #footer>
      <UButton
        label="Cancel"
        variant="outline"
        @click="modal.close()"
      />
      <UButton
        label="Delete"
        @click="onConfirm"
      />
    </template>
  </UModal>
</template>
