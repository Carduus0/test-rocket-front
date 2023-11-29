<template>
  <q-page class="row items-center justify-evenly">
    <PagePreLoader v-if="isLoading" />
    <div v-else class="flex column full-width">
      <grid-page
        :data:IResponse="leadsStore.getLeads"
        :drawer="drawer"
        @update:drawer="drawer = !drawer"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { axios, emitter } from '../utils/index';
import { useAxios } from '@vueuse/integrations/useAxios';
// import { useRouter } from 'vue-router';
import { useLeadsStore } from '../stores/leads-store';
import PagePreLoader from '../components/pre-loader';
import GridPage from './grid/GridPage.vue';

interface IResponse {
  status?: string;
  totalResults?: number;
  content: Lead[];
}

const leadsStore = useLeadsStore();
// const $router = useRouter();
// state

const drawer = ref(false);
// query

// computed

// methods

const {
  execute,
  data: leads,
  isLoading,
} = useAxios(
  '/api/leads',
  {
    method: 'GET',
  },
  axios,
  { immediate: false }
);
const fetchLeads = async () => {
  try {
    await execute({
      data: {
        limit: 200,
        skip: 0,
        orderBy: [
          {
            field: 'fullName',
            order: 'ASC',
          },
        ],
      },
    });
    leadsStore.setLeads({
      leads: leads.value?.map((d: any, idx: number) => ({
        ...d,
        num: idx + 1,
      })),
    });
  } catch (error) {
    emitter.emit('notify', {
      type: 'negative',
      // message: error?.message,
    });
  }
};

// life hooks
onMounted(async () => {
  await fetchLeads();
});
</script>
