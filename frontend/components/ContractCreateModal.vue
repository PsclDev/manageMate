<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const form = useTemplateRef('form');
const modal = useModal();
const { createContract } = useContractStore();

const schema = z.object({
  title: z.string().max(32),
  description: z.string().max(64).optional(),
  expiresAt: z.string().date(),
  lastTerminationDate: z.string().date(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  title: '',
  description: '',
  expiresAt: new Date().toISOString().slice(0, 10),
  lastTerminationDate: new Date().toISOString().slice(0, 10),
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data } = event;

  createContract({
    ...data,
    expiresAt: new Date(data.expiresAt),
    lastTerminationDate: new Date(data.lastTerminationDate),
  });
  modal.close();
}
</script>

<template>
  <UModal
    prevent-close
    close-icon="octicon:x-16"
    :ui="{ content: 'bg-red-50 dark:bg-zinc-950 shadow-mds', footer: 'justify-end' }"
  >
    <template #title>
      <div class="flex items-center gap-4">
        <h3 class="text-lg font-semibold">
          Create Contract
        </h3>
      </div>
    </template>
    <!-- Needed to prevent: Warning: Missing `Description` or `aria-describedby="undefined"` for DialogContent.  -->
    <template #description />

    <template #body>
      <UForm
        ref="form"
        class="flex flex-col gap-4"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormField
          label="Title"
          name="tilte"
        >
          <UInput
            v-model="state.title"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Description"
          name="description"
        >
          <UInput
            v-model="state.description"
            class="w-full"
          />
        </UFormField>
        <div class="flex gap-8 w-full">
          <UFormField
            class="w-full"
            label="Expires At"
            name="expiresAt"
          >
            <UInput
              v-model="state.expiresAt"
              type="date"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Last Termination Date"
            name="lastTerminationDate"
            class="w-full"
          >
            <UInput
              v-model="state.lastTerminationDate"
              type="date"
              class="w-full"
            />
          </UFormField>
        </div>
      </UForm>
    </template>
    <template #footer>
      <UButton
        label="Cancel"
        variant="outline"
        @click="modal.close()"
      />
      <UButton
        label="Create"
        type="submit"
        @click="form?.submit()"
      />
    </template>
  </UModal>
</template>
