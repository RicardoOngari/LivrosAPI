// Cria uma instância do Axios com a base da API da Open Library
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://openlibrary.org',
});

export default api;
