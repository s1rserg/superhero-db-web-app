import { DataTypes, Model, CreationOptional } from 'sequelize';
import { getSequelize } from '../../libs/database/database';

const sequelize = getSequelize();

class Superhero extends Model {
  declare id: CreationOptional<string>;
  declare nickname: string;
  declare realName: string;
  declare originDescription: string;
  declare superpowers: string;
  declare catchPhrase: string;
  declare images: string[];
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Superhero.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    realName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    superpowers: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    catchPhrase: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Superhero',
    tableName: 'Superheroes',
    timestamps: true,
  }
);

export { Superhero };
