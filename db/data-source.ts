import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataSourceOptions: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'treeo',
  autoLoadModels: true,
  synchronize: true,
}
