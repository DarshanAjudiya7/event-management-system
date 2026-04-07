import axios from 'axios';

const normalizedBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

if (normalizedBaseUrl) {
  axios.defaults.baseURL = normalizedBaseUrl;
}

export default axios;
