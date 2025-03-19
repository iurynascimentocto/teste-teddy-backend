import { Injectable } from '@nestjs/common';
import { SelectedClientOrmRepository } from '../../infrastructure/persistence/selected-clients.orm-repository';
import { Client } from '../../../clients/domain/entities/client.entity';

@Injectable()
export class AddRemoveSelectedClientUseCase {
  constructor(private readonly repository: SelectedClientOrmRepository) {}

  async execute(clientId: number): Promise<Client | null> {
    return this.repository.addOrRemove(clientId);
  }
}
