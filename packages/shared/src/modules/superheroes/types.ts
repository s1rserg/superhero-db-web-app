export type SuperheroDTO = {
  id: string;
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type SuperheroCreateRequestDTO = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: File[];
};

export type SuperheroUpdateRequestDTO = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: File[] | string[];
};

export type SuperheroGetAllResponseDTO = {
  data: SuperheroDTO[];
  totalAmount: number;
};

export type SuperheroQueryOptions = {
  name?: string;
  page?: number;
  perPage?: number;
};
