import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { ClientsModule } from './modules/clients/clients.module';
import { SelectedClientsModule } from './modules/selected-clients/selected-clients.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true },
        },
      },
    }),

    // Configuração do Banco de Dados PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: true,
    }),

    ClientsModule,
    SelectedClientsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
