import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './presentation/controllers/clients.controller';
import { Client } from './domain/entities/client.entity';
import { ClientOrmRepository } from './infrastructure/persistence/client.orm-repository';
import { CreateClientUseCase } from './application/use-cases/create-client.use-case';
import { FindAllClientsUseCase } from './application/use-cases/find-all-clients.use-case';
import { FindClientUseCase } from './application/use-cases/find-client.use-case';
import { UpdateClientUseCase } from './application/use-cases/update-client.use-case';
import { SoftDeleteClientUseCase } from './application/use-cases/soft-delete-client.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [
    ClientOrmRepository,
    CreateClientUseCase,
    FindAllClientsUseCase,
    FindClientUseCase,
    UpdateClientUseCase,
    SoftDeleteClientUseCase,
  ],
  exports: [ClientOrmRepository],
})
export class ClientsModule {}
