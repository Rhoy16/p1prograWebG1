// src/services/budgets.service.js

import { api } from './api';

/** Adapt a backend Budget to the frontend shape. */
function adaptBudget(b) {
  return {
    id: b.id,
    limitAmount: b.limitAmount,
    month: b.month,
    categoryId: b.categoryId,
    categoryName: b.category?.name || '',
  };
}

/** Fetch all budgets (includes category). */
export async function getBudgets() {
  const { data } = await api.get('/budgets');
  return (data || []).map(adaptBudget);
}

/** Create a new budget. `month` format: "YYYY-MM". */
export async function createBudget({ limitAmount, month, categoryId }) {
  const { data } = await api.post('/budgets', { limitAmount, month, categoryId });
  return adaptBudget(data);
}

/** Update an existing budget. */
export async function updateBudget(id, { limitAmount, month, categoryId }) {
  const { data } = await api.put(`/budgets/${id}`, { limitAmount, month, categoryId });
  return {
    budget: adaptBudget(data.budget),
    alerta: data.alerta,
  };
}
