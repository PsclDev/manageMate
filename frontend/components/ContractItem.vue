<script setup lang="ts">
import { ContractDeleteModal, ContractEditModal } from '#components';

const { contract } = defineProps<{
  contract: Contract;
}>();

const modal = useModal();
const { removeContract } = useContractStore();

const day = computed(() => {
  return contract.expiresAt.getDate().toString().padStart(2, '0');
});
const month = computed(() => {
  return new Intl.DateTimeFormat(navigator.language, { month: 'short' }).format(contract.expiresAt);
});
const lastTerminationDate = computed(() => {
  const day = contract.lastTerminationDate.getDate().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat(navigator.language, { month: 'short' }).format(contract.lastTerminationDate);
  return `${day} ${month}`;
});

function openEditContractModal() {
  modal.open(ContractEditModal, {
    contract,
  });
}

function openDeleteContract() {
  modal.open(ContractDeleteModal, {
    title: contract.title,
    onConfirm: () => {
      removeContract(contract);
      modal.close();
    },
  });
}
</script>

<template>
  <UCard>
    <div class="flex gap-5 items-center cursor-default">
      <div class="w-1/12 flex flex-col items-center text-rose-500 font-bold">
        <p class="text-xl">
          {{ day }}
        </p>
        <p class="text-sm">
          {{ month }}
        </p>
        <p />
      </div>
      <div class="flex-1">
        <h2 class="text-2xl font-bold">
          {{ contract.title }}
        </h2>
        <p>{{ lastTerminationDate }} | {{ contract.description }}</p>
      </div>
      <div class="w-1/12">
        <div class="flex flex-col gap-2 items-end">
          <UButton
            class="cursor-pointer"
            icon="octicon:pencil-24"
            variant="ghost"
            @click="openEditContractModal"
          />
          <UButton
            class="cursor-pointer"
            icon="octicon:trash-24"
            variant="ghost"
            @click="openDeleteContract"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>
