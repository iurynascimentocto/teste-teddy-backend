import { Injectable } from '@nestjs/common';
import { SelectedClientOrmRepository } from '../../infrastructure/persistence/selected-clients.orm-repository';

@Injectable()
export class RemoveSelectedClientUseCase {
  constructor(private readonly repository: SelectedClientOrmRepository) {}

  async execute(clientId: number) {
    return this.repository.remove(clientId);
  }
}
