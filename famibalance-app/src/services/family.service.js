// src/services/family.service.js

import { api } from './api';

const ROLE_LABELS = {
  JEFE: 'Jefe de Familia',
  ADMIN: 'Administrador',
  MEMBER: 'Miembro',
};

/** Adapt backend member to the shape GrupoFamiliar.jsx expects. */
function adaptMember(m) {
  return {
    id: m.id,
    nombre: m.name,
    correo: m.email,
    rol: ROLE_LABELS[m.role] || m.role,
    backendRole: m.role,
  };
}

/** Create a new family group. The logged-in user becomes JEFE. */
export async function createFamily(name) {
  const { data } = await api.post('/family', { name });
  return data;
}

/** Get all members of the logged-in user's family. */
export async function getFamilyMembers() {
  const { data } = await api.get('/family/members');
  return (data || []).map(adaptMember);
}

/** Get family-level analytics (expense sums grouped by user). */
export async function getFamilyAnalytics() {
  const { data } = await api.get('/family/analytics');
  return data || [];
}
