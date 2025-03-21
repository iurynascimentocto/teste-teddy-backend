import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectedClient } from './domain/entities/selected-client.entity';
import { SelectedClientOrmRepository } from './infrastructure/persistence/selected-clients.orm-repository';
import { CreateSelectedClientUseCase } from './application/use-cases/create-selected-client.use-case';
import { RemoveSelectedClientUseCase } from './application/use-cases/remove-selected-client.use-case';
import { RemoveAllSelectedClientUseCase } from './application/use-cases/remove-all-selected-client.use-case';
import { FindAllSelectedClientsUseCase } from './application/use-cases/find-all-selected-clients.use-case';
import { SelectedClientsController } from './presentation/controllers/selected-clients.controller';
import { ClientsModule } from '../clients/clients.module'; // 🟢 Importando o ClientsModule
import { Client } from '../clients/domain/entities/client.entity';
import { ClientOrmRepository } from '../clients/infrastructure/persistence/client.orm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([SelectedClient, Client]), ClientsModule],
  controllers: [SelectedClientsController],
  providers: [
    SelectedClientOrmRepository,
    ClientOrmRepository,
    CreateSelectedClientUseCase,
    RemoveSelectedClientUseCase,
    RemoveAllSelectedClientUseCase,
    FindAllSelectedClientsUseCase,
  ],
  exports: [SelectedClientOrmRepository],
})
export class SelectedClientsModule {}
