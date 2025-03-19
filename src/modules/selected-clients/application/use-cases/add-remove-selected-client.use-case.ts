import { Injectable } from '@nestjs/common';
import { SelectedClientOrmRepository } from '../../infrastructure/persistence/selected-clients.orm-repository';

@Injectable()
export class AddRemoveSelectedClientUseCase {
  constructor(private readonly repository: SelectedClientOrmRepository) {}

  async execute(clientId: number): Promise<void> {
    await this.repository.addOrRemove(clientId);
  }
}
