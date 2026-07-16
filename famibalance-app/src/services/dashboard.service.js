// src/services/dashboard.service.js

import { api } from './api';

/** Fetch the personal dashboard summary (income, expense, categories breakdown). */
export async function getPersonalDashboard() {
  const { data } = await api.get('/dashboard/personal');
  return data; // { income, expense, categories }
}
