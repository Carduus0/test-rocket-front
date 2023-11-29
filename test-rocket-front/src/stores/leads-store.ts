import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export interface Lead {
  id: string;
  source: { id: string | null; name: string | null };
  url: string;
  publishedAt: string | null;
  description: string | null;
  content: string | null;
}

interface LeadsState {
  leads: string | null;
}

export const useLeadsStore = defineStore({
  id: 'leads',
  state: (): LeadsState => ({
    leads: useStorage('LEADS', null, localStorage, {
      mergeDefaults: true,
    }) as unknown as string,
  }),
  getters: {
    getLeads(state): Lead[] | null {
      return JSON.parse(state.leads || 'null') as Lead[];
    },
    getLead:
      (state) =>
      (leadId: string): Lead | null =>
        (JSON.parse(state.leads || 'null') as Lead[]).find(
          (lead) => lead?.id === leadId
        ) || null,
  },
  actions: {
    setLeads({ leads }: { leads: Lead[] }): void {
      this.leads = JSON.stringify(leads);
    },
  },
});
