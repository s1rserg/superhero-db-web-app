import { getAll, getById, create, update, deleteById } from './actions.js';
import { actions, reducer } from './slice.js';

const allActions = {
  ...actions,
  getAll,
  getById,
  create,
  update,
  deleteById,
};

export { allActions as actions, reducer };
