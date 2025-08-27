import { Superhero } from './superhero.model';
import { BaseRepository } from '../../libs/core/base-repository';

class SuperheroRepository extends BaseRepository<Superhero> {
  constructor() {
    super(Superhero);
  }
}

export { SuperheroRepository };
