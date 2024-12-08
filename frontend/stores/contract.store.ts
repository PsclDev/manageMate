import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRuntimeConfig } from '#imports';

export const useContractStore = defineStore('contractStore', () => {
  const toast = useToast();
  const config = useRuntimeConfig();
  const baseUrl = `${config.public.apiBaseUrl}/contracts`;
  const contracts = ref<Contract[]>([]);

  const groupedContracts = computed(() => {
    const groupedByYear = contracts.value.reduce(
      (acc, contract) => {
        const year = contract.expiresAt.getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(contract);
        return acc;
      },
      {} as Record<number, typeof contracts.value>,
    );

    return Object.entries(groupedByYear)
      .map(([year, contracts]) => ({
        year: Number(year),
        contracts: contracts.sort(
          (a, b) => a.expiresAt.getTime() - b.expiresAt.getTime(),
        ),
      }))
      .sort((a, b) => a.year - b.year);
  });

  function toContract(contract: ContractDto): Contract {
    return {
      ...contract,
      expiresAt: new Date(contract.expiresAt),
      lastTerminationDate: new Date(contract.lastTerminationDate),
    };
  }

  async function fetchContracts() {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok)
        toast.add({ title: 'Failed to fetch contracts', color: 'error' });
      const data = await response.json();
      contracts.value = data.map((contract: ContractDto) =>
        toContract(contract),
      );
    }
    catch (error) {
      console.error('Error fetching contracts:', error);
      toast.add({ title: 'Failed to fetch contracts', color: 'error' });
    }
  }

  async function createContract(contract: CreateContract) {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contract),
      });
      if (!response.ok)
        toast.add({ title: 'Failed to create contract', color: 'error' });
      const newContract = await response.json();
      contracts.value.push(toContract(newContract));
    }
    catch (error) {
      console.error('Error creating contract:', error);
      toast.add({ title: 'Failed to create contract', color: 'error' });
    }
  }

  async function editContract(contractId: number, contract: CreateContract) {
    try {
      const response = await fetch(`${baseUrl}/${contractId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contract),
      });
      if (!response.ok)
        toast.add({ title: 'Failed to update contract', color: 'error' });
      const updatedContract = await response.json();
      const index = contracts.value.findIndex(c => c.id === contractId);
      if (index !== -1) {
        contracts.value[index] = toContract(updatedContract);
      }
    }
    catch (error) {
      console.error('Error updating contract:', error);
      toast.add({ title: 'Failed to update contract', color: 'error' });
    }
  }

  async function removeContract(contract: Contract) {
    try {
      const response = await fetch(`${baseUrl}/${contract.id}`, {
        method: 'DELETE',
      });
      if (!response.ok)
        toast.add({ title: 'Failed to delete contract', color: 'error' });
      contracts.value = contracts.value.filter(c => c.id !== contract.id);
    }
    catch (error) {
      console.error('Error deleting contract:', error);
      toast.add({ title: 'Failed to delete contract', color: 'error' });
    }
  }

  return {
    contracts,
    groupedContracts,
    fetchContracts,
    createContract,
    editContract,
    removeContract,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContractStore, import.meta.hot));
}
