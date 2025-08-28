import { createSlice } from '@reduxjs/toolkit';
import { getAll, getById, create, update, deleteById } from './actions';
import { SuperheroDTO, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError, notifySuccess } from '~/utils/notification/notification';
import { SLICE_NAME } from './constants';

export interface UsersState {
  superheroes: SuperheroDTO[];
  totalAmount: number;
  status: ValueOf<typeof DataStatus>;
  superhero: SuperheroDTO | null;
  superheroStatus: ValueOf<typeof DataStatus>;
  createStatus: ValueOf<typeof DataStatus>;
  updateStatus: ValueOf<typeof DataStatus>;
  deleteStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: UsersState = {
  superheroes: [],
  totalAmount: 0,
  status: DataStatus.IDLE,
  superhero: null,
  superheroStatus: DataStatus.IDLE,
  createStatus: DataStatus.IDLE,
  updateStatus: DataStatus.IDLE,
  deleteStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetDeleteStatus(state) {
      state.deleteStatus = DataStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.superheroes = action.payload.data;
        state.totalAmount = action.payload.totalAmount;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to load superheroes.');
      });

    builder
      .addCase(getById.pending, (state) => {
        state.superheroStatus = DataStatus.PENDING;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.superhero = action.payload;
        state.superheroStatus = DataStatus.SUCCESS;
      })
      .addCase(getById.rejected, (state, action) => {
        state.superheroStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to load superhero.');
      });

    builder
      .addCase(create.pending, (state) => {
        state.createStatus = DataStatus.PENDING;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.createStatus = DataStatus.SUCCESS;
        state.superheroes = [action.payload, ...state.superheroes];
        notifySuccess('Superhero created successfully.');
      })
      .addCase(create.rejected, (state, action) => {
        state.createStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to create a superhero.');
      });

    builder
      .addCase(update.pending, (state) => {
        state.updateStatus = DataStatus.PENDING;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.updateStatus = DataStatus.SUCCESS;
        const updatedSuperhero = action.payload;
        const superheroId = updatedSuperhero.id;
        state.superheroes = state.superheroes.map((s) => (s.id === superheroId ? updatedSuperhero : s));
        state.superhero = action.payload;
        notifySuccess('Superhero updated successfully.');
      })
      .addCase(update.rejected, (state, action) => {
        state.updateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to update a superhero.');
      });

    builder
      .addCase(deleteById.pending, (state) => {
        state.deleteStatus = DataStatus.PENDING;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.deleteStatus = DataStatus.SUCCESS;
        state.superheroes = state.superheroes.filter((s) => s.id !== action.payload);
        notifySuccess('Superhero deleted successfully.');
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.deleteStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to delete a superhero.');
      });
  },
});

export { reducer, actions };
