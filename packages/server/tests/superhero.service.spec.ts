jest.mock('../src/modules/superheroes/superhero.model', () => ({
  Superhero: {},
}));

jest.mock('../src/modules/superheroes/superhero.repository');

import { SuperheroRepository } from '../src/modules/superheroes/superhero.repository';
import { SuperheroService } from '../src/modules/superheroes/superhero.service';
import type { Superhero } from '../src/modules/superheroes/superhero.model';

describe('SuperheroService', () => {
  let service: SuperheroService;
  let repo: jest.Mocked<SuperheroRepository>;

  const superhero = {
    id: '1',
    nickname: 'Batman',
    realName: 'Bruce Wayne',
    originDescription: 'Rich orphan fights crime',
    superpowers: 'Money, intelligence, martial arts',
    catchPhrase: 'I am Batman',
    images: ['batman.png'],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as unknown as Superhero;

  beforeEach(() => {
    repo = new SuperheroRepository() as jest.Mocked<SuperheroRepository>;
    service = new SuperheroService();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (service as any).superheroRepository = repo;
  });

  describe('getAll', () => {
    it('should return paginated superheroes', async () => {
      repo.findAll.mockResolvedValue([superhero]);
      repo.count.mockResolvedValue(1);

      const result = await service.getAll(1, 10);

      expect(repo.findAll).toHaveBeenCalledWith(expect.objectContaining({ offset: 0, limit: 10 }));
      expect(result.totalAmount).toBe(1);
      expect(result.data[0].nickname).toBe('Batman');
    });

    it('should filter by nickname', async () => {
      repo.findAll.mockResolvedValue([superhero]);
      repo.count.mockResolvedValue(1);

      await service.getAll(1, 10, 'Bat');

      expect(repo.findAll).toHaveBeenCalledWith(expect.objectContaining({ where: expect.any(Object) }));
    });
  });

  describe('getById', () => {
    it('should return a superhero by id', async () => {
      repo.findById.mockResolvedValue(superhero);

      const result = await service.getById('1');

      expect(result?.id).toBe('1');
      expect(result?.nickname).toBe('Batman');
    });

    it('should throw if not found', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.getById('2')).rejects.toMatchObject({ status: 404 });
    });
  });

  describe('create', () => {
    it('should create and return a superhero DTO', async () => {
      repo.create.mockResolvedValue(superhero);

      const result = await service.create({
        nickname: 'Batman',
        realName: 'Bruce Wayne',
        originDescription: 'Rich orphan fights crime',
        superpowers: 'Money, intelligence, martial arts',
        catchPhrase: 'I am Batman',
        images: ['batman.png'],
      });

      expect(repo.create).toHaveBeenCalled();
      expect(result.nickname).toBe('Batman');
    });
  });

  describe('update', () => {
    it('should update and return a superhero DTO', async () => {
      repo.update.mockResolvedValue(superhero);
      const updatedData = {
        nickname: 'Batman Updated',
        realName: '',
        originDescription: '',
        superpowers: '',
        catchPhrase: '',
        images: [],
      };

      const result = await service.update('1', updatedData);

      expect(repo.update).toHaveBeenCalledWith('1', updatedData);
      expect(result.id).toBe('1');
    });

    it('should throw if superhero not found', async () => {
      repo.update.mockResolvedValue(null);

      await expect(
        service.update('2', {
          nickname: 'Unknown',
          realName: '',
          originDescription: '',
          superpowers: '',
          catchPhrase: '',
          images: [],
        })
      ).rejects.toMatchObject({ status: 404 });
    });
  });

  describe('delete', () => {
    it('should delete a superhero', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      repo.delete.mockResolvedValueOnce(true as unknown as any);

      await expect(service.delete('1')).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith('1');
    });

    it('should throw if superhero not found', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      repo.delete.mockResolvedValueOnce(false as unknown as any);

      await expect(service.delete('2')).rejects.toMatchObject({ status: 404 });
    });
  });
});
