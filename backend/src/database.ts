import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });  // `force: true` will drop existing tables before creating new ones
    console.log('Database synced successfully!');
  } catch (error) {
    
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

export default sequelize;

