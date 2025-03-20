import { Injectable } from '@nestjs/common';
import { SelectedClientOrmRepository } from '../../infrastructure/persistence/selected-clients.orm-repository';

@Injectable()
export class FindAllSelectedClientsUseCase {
  constructor(private readonly repository: SelectedClientOrmRepository) {}

  async execute(page: number = 1, limit: number = 16) {
    return this.repository.findAll(page, limit);
  }
}
