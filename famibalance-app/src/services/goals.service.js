// src/services/goals.service.js

import { api } from './api';

/** Adapt a backend SavingGoal to the shape GoalCard expects. */
function adaptGoal(g) {
  return {
    id: g.id,
    name: g.title,
    target: g.targetAmount,
    saved: g.savedAmount,
    deadline: g.deadline,
  };
}

/** Fetch all saving goals for the logged-in user. */
export async function getGoals() {
  const { data } = await api.get('/goals');
  return (data || []).map(adaptGoal);
}

/** Create a new saving goal. Uses frontend field names. */
export async function createGoal({ name, target, saved, deadline }) {
  const { data } = await api.post('/goals', {
    title: name,
    targetAmount: target,
    savedAmount: saved || 0,
    deadline,
  });
  return adaptGoal(data);
}

/** Update a saving goal. */
export async function updateGoal(id, fields) {
  const body = {};
  if (fields.name !== undefined)   body.title        = fields.name;
  if (fields.target !== undefined) body.targetAmount  = fields.target;
  if (fields.saved !== undefined)  body.savedAmount   = fields.saved;
  if (fields.deadline !== undefined) body.deadline    = fields.deadline;

  const { data } = await api.put(`/goals/${id}`, body);
  return adaptGoal(data);
}

/** Delete a saving goal by id. */
export async function deleteGoal(id) {
  await api.delete(`/goals/${id}`);
}
