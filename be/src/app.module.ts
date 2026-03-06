/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
<<<<<<< HEAD
import { UsersModule } from './modules/users/users.module'; 
import { ShopsModule } from './modules/shops/shops.module';
require('dotenv').config();

const password = process.env.DB_PASSWORD || '';
=======
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
require('dotenv').config();

const password = process.env.DB_PASSWORD  || '';
>>>>>>> 51bed1d574c6d496c739f49c1df00c8330a9eb0e
=======
require('dotenv').config();

const password = process.env.DB_PASSWORD || '';

>>>>>>> fdb4d5abb562648b4a033b69707b06497a388cd6

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: password,
      database: 'outfitslab_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
<<<<<<< HEAD
    UsersModule,
    ShopsModule,
=======
    AuthModule,  
    UsersModule,
>>>>>>> 51bed1d574c6d496c739f49c1df00c8330a9eb0e
  ],
})
export class AppModule { }
