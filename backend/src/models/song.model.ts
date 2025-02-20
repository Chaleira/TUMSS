import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Song extends Model {
  public id!: number;
  public title!: string;
  public artist!: string;
  public fileId!: string;
}

Song.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'songs',
  }
);

export default Song;
