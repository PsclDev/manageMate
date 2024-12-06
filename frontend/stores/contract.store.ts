export const useContractStore = defineStore('contractStore', () => {
  const contracts = ref<Contract[]>([
    {
      id: 1,
      title: 'Mobile Data Plan - Basic',
      description: '5GB data plan with unlimited calls and texts.',
      expiresAt: new Date('2025-06-01'),
      lastTerminationDate: new Date('2025-05-15'),
    },
    {
      id: 2,
      title: 'Mobile Data Plan - Premium',
      description: 'Unlimited data plan with international roaming.',
      expiresAt: new Date('2026-01-11'),
      lastTerminationDate: new Date('2025-12-15'),
    },
    {
      id: 3,
      title: 'Electricity Plan - Standard',
      description: 'Standard residential electricity plan with fixed rate.',
      expiresAt: new Date('2026-09-18'),
      lastTerminationDate: new Date('2026-08-15'),
    },
    {
      id: 4,
      title: 'Electricity Plan - Green Energy',
      description: '100% renewable energy plan with variable rate.',
      expiresAt: new Date('2025-03-23'),
      lastTerminationDate: new Date('2025-02-15'),
    },
    {
      id: 5,
      title: 'Health Insurance - Silver',
      description: 'Basic health insurance plan with annual coverage.',
      expiresAt: new Date('2024-12-30'),
      lastTerminationDate: new Date('2024-11-15'),
    },
    {
      id: 6,
      title: 'Life Insurance - Term 3',
      description: '3-year term life insurance with $250,000 coverage.',
      expiresAt: new Date('2026-10-15'),
      lastTerminationDate: new Date('2026-09-15'),
    },
    {
      id: 7,
      title: 'Home Insurance - Basic Coverage',
      description: 'Basic coverage for home structure and contents.',
      expiresAt: new Date('2025-08-01'),
      lastTerminationDate: new Date('2025-07-15'),
    },
  ]);

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

    return Object.entries(groupedByYear).map(([year, contracts]) => ({
      year: Number(year),
      contracts,
    }));
  });

  function createContract(contract: CreateContract) {
    contracts.value.push({ id: Math.random(), ...contract });
  }

  function editContract(contractId: number, contract: CreateContract) {
    const index = contracts.value.findIndex(c => c.id === contractId);
    contracts.value[index] = { ...contracts.value[index], ...contract };
  }

  function removeContract(contract: Contract) {
    contracts.value = contracts.value.filter(c => c.id !== contract.id);
  }

  return { createContract, editContract, groupedContracts, removeContract };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContractStore, import.meta.hot));
}
