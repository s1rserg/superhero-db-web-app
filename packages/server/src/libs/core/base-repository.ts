import { Model, ModelStatic, CreationAttributes, Attributes, FindOptions, Transaction } from 'sequelize';

export abstract class BaseRepository<T extends Model> {
  protected readonly model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async create(item: CreationAttributes<T>, options?: { transaction?: Transaction }): Promise<T> {
    return this.model.create(item, options);
  }

  public async findById(
    id: number | string,
    options: Omit<FindOptions<Attributes<T>>, 'where'> & { transaction?: Transaction } = {}
  ): Promise<T | null> {
    return this.model.findByPk(id, options);
  }

  public async findAll(options: FindOptions<Attributes<T>> = {}): Promise<T[]> {
    return this.model.findAll(options);
  }

  public async count(options: Omit<FindOptions<Attributes<T>>, 'attributes'> = {}): Promise<number> {
    return this.model.count(options);
  }

  public async update(
    id: number | string,
    item: Partial<Attributes<T>>,
    options: { transaction?: Transaction } = {}
  ): Promise<T | null> {
    const record = await this.model.findByPk(id, options);
    if (!record) return null;

    await record.update(item, options);
    return record;
  }

  public async delete(id: number | string, options: { transaction?: Transaction } = {}): Promise<T | null> {
    const record = await this.model.findByPk(id, options);
    if (!record) return null;

    await record.destroy(options);
    return record;
  }

  public async findAndCountAll(options: FindOptions<Attributes<T>> = {}) {
    return this.model.findAndCountAll(options);
  }
}
