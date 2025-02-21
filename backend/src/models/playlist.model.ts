import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import User from "./user.model";

class Playlist extends Model {
	public id!: number;
	public name!: string;
	public userId!: number;
}

Playlist.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
	},
	{
		sequelize,
		tableName: "playlists",
	}
);

export default Playlist;
