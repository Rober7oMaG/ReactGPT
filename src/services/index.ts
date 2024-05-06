import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_GPT_API,
  headers: {
    'Content-Type': 'application/json',
  },
});
