import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/products';

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all products
export const getProducts = (filters = {}) => {
  let url = '/products';
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  
  if (params.toString()) {
    url += '?' + params.toString();
  }
  
  return apiClient.get(url);
};

// Get product by ID
export const getProductById = (id) => {
  return apiClient.get(`/products/${id}`);
};

// Create new product
export const createProduct = (productData) => {
  return apiClient.post('/products', productData);
};

// Update product
export const updateProduct = (id, productData) => {
  return apiClient.put(`/products/${id}`, productData);
};

// Delete product
export const deleteProduct = (id) => {
  return apiClient.delete(`/products/${id}`);
};
