import { ref, watchEffect } from 'vue';
export const useHeadersConfig = () => {
  const headersConfig = ref();
  const doHeadersConfig = () => {
    headersConfig.value = [
      {
        name: 'num',
        label: '№',
        align: 'left',
        field: 'num',
        style: 'width: 15%',
      },
      {
        name: 'naming',
        label: 'Название',
        align: 'left',
        field: 'naming',
        style: 'width: 15%',
      },
      {
        name: 'budget',
        label: 'Бюджет',
        field: 'budget',
        align: 'left',
        style: 'width: 15%',
      },
      {
        name: 'status',
        label: 'Статус',
        align: 'left',
        field: 'status',
        style: 'width: 15%',
      },
      {
        name: 'fullName',
        label: 'Ответственный',
        align: 'left',
        field: 'fullName',
        style: 'width: 15%',
      },
    ];
  };
  watchEffect(doHeadersConfig);
  return {
    headersConfig,
  };
};
