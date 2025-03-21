import { Injectable } from '@nestjs/common';
import { SelectedClientOrmRepository } from '../../infrastructure/persistence/selected-clients.orm-repository';

@Injectable()
export class RemoveAllSelectedClientUseCase {
  constructor(private readonly repository: SelectedClientOrmRepository) {}

  async execute() {
    return this.repository.removeAll();
  }
}
