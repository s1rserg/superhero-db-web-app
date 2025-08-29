import {
  SuperheroCreateRequestDTO,
  SuperheroDTO,
  SuperheroGetAllResponseDTO,
  SuperheroQueryOptions,
  SuperheroUpdateRequestDTO,
} from '~/common/types/types';
import { ApiPath } from '../../common/enums/enums';
import { Http } from '../http/http.service';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Superheroes {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.SUPERHEROES;
  }

  public getAll(query: SuperheroQueryOptions): Promise<SuperheroGetAllResponseDTO> {
    const queryParams: Record<string, string> = {
      page: String(query.page ?? 1),
      perPage: String(query.perPage ?? 10),
    };

    if (query.name) queryParams.nickname = query.name;

    return this.http.load(this.getUrl(), {
      method: 'GET',
      query: queryParams,
    });
  }

  public getById(id: SuperheroDTO['id']): Promise<SuperheroDTO> {
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'GET',
    });
  }

  public create(data: SuperheroCreateRequestDTO): Promise<SuperheroDTO> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images') formData.append(key, value as string);
    });

    if (data.images) {
      data.images.forEach((file) => {
        formData.append('images', file);
      });
    }

    return this.http.load(this.getUrl(), {
      method: 'POST',
      payload: formData,
    });
  }

  public update(id: SuperheroDTO['id'], data: SuperheroUpdateRequestDTO): Promise<SuperheroDTO> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(key, value as string);
      }
    });

    if (data.images) {
      data.images.forEach((img) => {
        if (img instanceof File) {
          formData.append('images', img);
        } else {
          formData.append('existingImages', img);
        }
      });
    }

    return this.http.load(this.getUrl(`/${id}`), {
      method: 'PATCH',
      payload: formData,
    });
  }

  public delete(id: SuperheroDTO['id']): Promise<void> {
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'DELETE',
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Superheroes };
export type { Constructor as SuperheroesConstructor };
