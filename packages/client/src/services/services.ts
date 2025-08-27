import { ApiPath } from '~/common/enums/enums';
import { Http } from './http/http.service';
import { Superheroes } from './superheroes/superheroes.service';

const http = new Http();

const superheroes = new Superheroes({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, superheroes };
