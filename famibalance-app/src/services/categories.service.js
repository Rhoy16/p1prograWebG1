// src/services/categories.service.js

import { api } from './api';

/** Fetch all categories. Returns `[{ id, name, isCustom }]`. */
export async function getCategories() {
  const { data } = await api.get('/categories');
  return data || [];
}

/** Create a new custom category. */
export async function createCategory(name) {
  const { data } = await api.post('/categories', { name, isCustom: true });
  return data;
}
