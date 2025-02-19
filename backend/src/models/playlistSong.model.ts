import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import Playlist from './playlist.model';
import Song from './song.model';

class PlaylistSong extends Model {
  public playlistId!: number;
  public songId!: number;
}

PlaylistSong.init(
  {
    playlistId: {
      type: DataTypes.INTEGER,
      references: {
        model: Playlist,
        key: 'id',
      },
      primaryKey: true,
    },
    songId: {
      type: DataTypes.INTEGER,
      references: {
        model: Song,
        key: 'id',
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'playlist_songs',
  }
);

export default PlaylistSong;
