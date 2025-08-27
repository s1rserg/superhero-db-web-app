import { SuperheroCreateRequestDTO } from '~/common/types/types';

const DEFAULT_SUPERHERO_CREATE_PAYLOAD: SuperheroCreateRequestDTO = {
  nickname: '',
  realName: '',
  originDescription: '',
  superpowers: '',
  catchPhrase: '',
  images: [],
};

export { DEFAULT_SUPERHERO_CREATE_PAYLOAD };
