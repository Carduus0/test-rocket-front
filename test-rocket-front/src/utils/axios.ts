import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://scarduus.amocrm.ru/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
