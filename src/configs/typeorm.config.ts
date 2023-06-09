import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER_ID,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_USER_DB,
  entities: ['dist/entities/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};
