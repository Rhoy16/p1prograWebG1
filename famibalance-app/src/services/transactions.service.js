// src/services/transactions.service.js
// Handles all transaction-related API calls and adapts backend ↔ frontend shapes.

import { api } from './api';

// ── Mapping helpers ──────────────────────────────────────────────────

/** Backend → Frontend type mapping */
const TYPE_FROM_API = { INGRESO: 'ingreso', EGRESO: 'gasto' };
/** Frontend → Backend type mapping */
const TYPE_TO_API   = { ingreso: 'INGRESO', gasto: 'EGRESO' };

function formatDate(isoString) {
  const d = new Date(isoString);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/** Adapt a single backend Transaction to the shape the frontend expects. */
function adaptTransaction(tx) {
  return {
    id: tx.id,
    name: tx.description,
    date: formatDate(tx.date),
    rawDate: tx.date,
    category: tx.category?.name || '',
    categoryId: tx.categoryId,
    amount: tx.amount,
    type: TYPE_FROM_API[tx.type] || tx.type,
    currency: tx.currency,
    paymentMethod: tx.paymentMethod,
  };
}

// ── Public API ───────────────────────────────────────────────────────

/**
 * Fetch all transactions for the logged-in user (or family if scope='family').
 * Accepts optional query-string params: { scope, startDate, endDate, type, categoryId, ... }
 */
export async function getTransactions(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') query.append(k, v);
  });
  const qs = query.toString();
  const { data } = await api.get(`/transactions${qs ? `?${qs}` : ''}`);
  return (data || []).map(adaptTransaction);
}

/**
 * Create a new transaction.
 * `payload` uses frontend field names; this function converts them to the
 * backend shape automatically.
 */
export async function createTransaction({ name, amount, type, categoryId, paymentMethod, currency, date }) {
  const body = {
    description: name,
    amount,
    type: TYPE_TO_API[type] || type,
    categoryId,
    paymentMethod: paymentMethod || 'CASH',
    ...(currency ? { currency } : {}),
    ...(date ? { date } : {}),
  };

  const { data } = await api.post('/transactions', body);
  return {
    transaction: adaptTransaction(data.transaction),
    alertTrigger: data.alertTrigger || false,
    mensaje: data.mensaje || null,
  };
}

/** Update an existing transaction. */
export async function updateTransaction(id, fields) {
  const body = {};
  if (fields.name !== undefined)          body.description   = fields.name;
  if (fields.amount !== undefined)        body.amount        = fields.amount;
  if (fields.type !== undefined)          body.type          = TYPE_TO_API[fields.type] || fields.type;
  if (fields.categoryId !== undefined)    body.categoryId    = fields.categoryId;
  if (fields.paymentMethod !== undefined) body.paymentMethod = fields.paymentMethod;
  if (fields.currency !== undefined)      body.currency      = fields.currency;
  if (fields.date !== undefined)          body.date          = fields.date;

  const { data } = await api.put(`/transactions/${id}`, body);
  return adaptTransaction(data);
}

/** Delete a transaction by id. */
export async function deleteTransaction(id) {
  await api.delete(`/transactions/${id}`);
}

/** Upload a receipt image/PDF for OCR extraction. Returns the extracted fields. */
export async function scanReceipt(file) {
  const form = new FormData();
  form.append('receipt', file);
  const { data } = await api.upload('/transactions/ocr', form);
  return data; // { description, amount, ... }
}
