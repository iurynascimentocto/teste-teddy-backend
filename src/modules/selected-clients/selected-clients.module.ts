import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectedClient } from './domain/entities/selected-client.entity';
import { SelectedClientOrmRepository } from './infrastructure/persistence/selected-clients.orm-repository';
import { AddRemoveSelectedClientUseCase } from './application/use-cases/add-remove-selected-client.use-case';
import { FindAllSelectedClientsUseCase } from './application/use-cases/find-all-selected-clients.use-case';
import { SelectedClientsController } from './presentation/controllers/selected-clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SelectedClient])],
  controllers: [SelectedClientsController],
  providers: [
    SelectedClientOrmRepository,
    AddRemoveSelectedClientUseCase,
    FindAllSelectedClientsUseCase,
  ],
  exports: [SelectedClientOrmRepository],
})
export class SelectedClientsModule {}
