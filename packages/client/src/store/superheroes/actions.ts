import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  SuperheroCreateRequestDTO,
  SuperheroDTO,
  SuperheroGetAllResponseDTO,
  SuperheroQueryOptions,
  SuperheroUpdateRequestDTO,
} from '~/common/types/types';
import { SLICE_NAME } from './constants';

const getAll = createAsyncThunk<SuperheroGetAllResponseDTO, SuperheroQueryOptions, AsyncThunkConfig>(
  `${SLICE_NAME}/getAll`,
  async (query, { extra: { superheroesService } }) => {
    return superheroesService.getAll(query);
  }
);

const getById = createAsyncThunk<SuperheroDTO, SuperheroDTO['id'], AsyncThunkConfig>(
  `${SLICE_NAME}/getById`,
  async (id, { extra: { superheroesService } }) => {
    return superheroesService.getById(id);
  }
);

const create = createAsyncThunk<SuperheroDTO, SuperheroCreateRequestDTO, AsyncThunkConfig>(
  `${SLICE_NAME}/create`,
  async (data, { extra: { superheroesService } }) => {
    return superheroesService.create(data);
  }
);

const update = createAsyncThunk<
  SuperheroDTO,
  { id: SuperheroDTO['id']; data: SuperheroUpdateRequestDTO },
  AsyncThunkConfig
>(`${SLICE_NAME}/update`, async ({ id, data }, { extra: { superheroesService } }) => {
  return superheroesService.update(id, data);
});

const deleteById = createAsyncThunk<SuperheroDTO['id'], SuperheroDTO['id'], AsyncThunkConfig>(
  `${SLICE_NAME}/delete`,
  async (id, { extra: { superheroesService } }) => {
    await superheroesService.delete(id);
    return id;
  }
);

export { getAll, getById, create, update, deleteById };
