<script setup lang="ts">
import { ContractCreateModal } from '#components';

useHead({
  title: 'Manage Mate',
});

const modal = useModal();
const { groupedContracts } = storeToRefs(useContractStore());

function openCreateContractModal() {
  modal.open(ContractCreateModal);
}
</script>

<template>
  <div>
    <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-4xl font-bold cursor-default">
          Your Timeline
        </h1>
        <UButton
          size="xl"
          variant="soft"
          label="Add Contract"
          @click="openCreateContractModal"
        />
      </div>
    </div>
    <div
      v-for="(year, index) in groupedContracts"
      :key="year.year"
      class="flex flex-col gap-8"
    >
      <h3 class="text-2xl font-bold">
        {{ year.year }}
      </h3>
      <div
        v-for="contract in year.contracts"
        :key="contract.id"
      >
        <ContractItem :contract="contract" />
      </div>
      <div
        v-if="index !== groupedContracts.length - 1"
        class="border-t border-rose-300 border-dashed mb-8 px-12"
      />
    </div>
  </div>
</template>
