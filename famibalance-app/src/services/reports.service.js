// src/services/reports.service.js

import { api } from './api';

/**
 * Request a report export from the backend.
 * `format` can be 'csv' or 'pdf'.
 * Extra query params (scope, startDate, endDate, type, ...) are forwarded.
 * Returns a Blob ready to be downloaded.
 */
export async function exportReport(format = 'csv', params = {}) {
  const query = new URLSearchParams({ format, ...params });
  const res = await api.get(`/reports/export?${query}`, { raw: true });

  if (!res.ok) {
    const json = await res.json();
    const err = new Error(json.msg || `Error ${res.status}`);
    err.status = res.status;
    throw err;
  }

  const blob = await res.blob();
  const ext = format === 'pdf' ? 'pdf' : 'csv';
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reporte-famibalance.${ext}`;
  link.click();
  URL.revokeObjectURL(url);
}
