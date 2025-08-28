import { Op } from 'sequelize';
import {
  SuperheroCreateInternalDTO,
  SuperheroDTO,
  SuperheroGetAllResponseDTO,
  SuperheroUpdateRequestDTO,
} from '../../libs/common/common';
import { Superhero } from './superhero.model';
import { SuperheroRepository } from './superhero.repository';

class SuperheroService {
  private superheroRepository = new SuperheroRepository();

  public async getAll(page = 1, perPage = 10, nickname?: string): Promise<SuperheroGetAllResponseDTO> {
    const skip = (page - 1) * perPage;

    const where = nickname ? { nickname: { [Op.iLike]: `%${nickname}%` } } : {};

    const [superheroes, totalAmount] = await Promise.all([
      this.superheroRepository.findAll({
        where,
        offset: skip,
        limit: perPage,
        order: [['createdAt', 'DESC']],
      }),
      this.superheroRepository.count({ where }),
    ]);

    return {
      totalAmount,
      data: superheroes.map((superhero) => this.toDTO(superhero)),
    };
  }

  public async getById(id: Superhero['id']): Promise<SuperheroDTO | null> {
    const superhero = await this.superheroRepository.findById(id);

    if (!superhero) throw { status: 404, errors: 'Superhero is not found.' };

    return this.toDTO(superhero);
  }

  public async create(data: SuperheroCreateInternalDTO): Promise<SuperheroDTO> {
    const superhero = await this.superheroRepository.create(data);

    return this.toDTO(superhero);
  }

  public async update(id: Superhero['id'], data: SuperheroUpdateRequestDTO): Promise<SuperheroDTO> {
    const superhero = await this.superheroRepository.update(id, data);

    if (!superhero) throw { status: 404, errors: 'Superhero is not found.' };

    return this.toDTO(superhero);
  }

  public async delete(id: Superhero['id']): Promise<void> {
    const deleted = await this.superheroRepository.delete(id);

    if (!deleted) throw { status: 404, errors: 'Superhero is not found.' };
  }

  private toDTO(superhero: Superhero): SuperheroDTO {
    return {
      id: superhero.id,
      nickname: superhero.nickname,
      realName: superhero.realName,
      originDescription: superhero.originDescription,
      superpowers: superhero.superpowers,
      catchPhrase: superhero.catchPhrase,
      images: superhero.images,
      createdAt: superhero.createdAt,
      updatedAt: superhero.updatedAt,
    };
  }
}

export { SuperheroService };
