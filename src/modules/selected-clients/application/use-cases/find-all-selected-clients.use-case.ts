import { Injectable } from '@nestjs/common';
import { SelectedClientOrmRepository } from '../../infrastructure/persistence/selected-clients.orm-repository';
import { Client } from '../../../clients/domain/entities/client.entity';

@Injectable()
export class FindAllSelectedClientsUseCase {
  constructor(private readonly repository: SelectedClientOrmRepository) {}

  async execute(page: number = 1): Promise<{ data: Client[]; total: number }> {
    return this.repository.findAll(page);
  }
}
