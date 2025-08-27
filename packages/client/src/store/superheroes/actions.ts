import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice.js';
import {
  AsyncThunkConfig,
  SuperheroCreateRequestDTO,
  SuperheroDTO,
  SuperheroGetAllResponseDTO,
  SuperheroQueryOptions,
  SuperheroUpdateRequestDTO,
} from '~/common/types/types';

const getAll = createAsyncThunk<SuperheroGetAllResponseDTO, SuperheroQueryOptions, AsyncThunkConfig>(
  `${name}/getAll`,
  async (query, { extra: { superheroesService } }) => {
    return superheroesService.getAll(query);
  }
);

const getById = createAsyncThunk<SuperheroDTO, SuperheroDTO['id'], AsyncThunkConfig>(
  `${name}/getById`,
  async (id, { extra: { superheroesService } }) => {
    return superheroesService.getById(id);
  }
);

const create = createAsyncThunk<SuperheroDTO, SuperheroCreateRequestDTO, AsyncThunkConfig>(
  `${name}/create`,
  async (data, { extra: { superheroesService } }) => {
    return superheroesService.create(data);
  }
);

const update = createAsyncThunk<
  SuperheroDTO,
  { id: SuperheroDTO['id']; data: SuperheroUpdateRequestDTO },
  AsyncThunkConfig
>(`${name}/update`, async ({ id, data }, { extra: { superheroesService } }) => {
  return superheroesService.update(id, data);
});

const deleteById = createAsyncThunk<SuperheroDTO['id'], SuperheroDTO['id'], AsyncThunkConfig>(
  `${name}/delete`,
  async (id, { extra: { superheroesService } }) => {
    await superheroesService.delete(id);
    return id;
  }
);

export { getAll, getById, create, update, deleteById };
