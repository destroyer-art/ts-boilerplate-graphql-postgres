import { Dialect, Sequelize } from 'sequelize';
import User from './models/user';

interface Config {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: string;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

const {
  DEV_DB_MIN,
  DEV_DB_MAX,
  DEV_DB_IDLE,
  DEV_DB_HOST,
  DEV_DB_USER,
  DEV_DB_NAME,
  DEV_DB_DIALECT,
  DEV_DB_ACQUIRE,
  DEV_DB_PASSWORD,
} = process.env;

const config: Config = {
  HOST: DEV_DB_HOST,
  USER: DEV_DB_USER,
  PASSWORD: DEV_DB_PASSWORD,
  DB: DEV_DB_NAME,
  dialect: DEV_DB_DIALECT,
  pool: {
    max: Number(DEV_DB_MAX),
    min: Number(DEV_DB_MIN),
    acquire: Number(DEV_DB_ACQUIRE),
    idle: Number(DEV_DB_IDLE),
  },
};

let sequelize;
const isDevelopment: boolean = process.env.NODE_ENV === 'development';
if (isDevelopment) {
  sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect as Dialect,
    operatorsAliases: 0 as any,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  });
} else {
  console.log('connecting to production database', process.env.DATABASE_URL);
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User(sequelize, Sequelize);

export default db;
