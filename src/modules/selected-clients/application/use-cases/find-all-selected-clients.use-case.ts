import { Injectable } from '@nestjs/common';
import { SelectedClientOrmRepository } from '../../infrastructure/persistence/selected-clients.orm-repository';

@Injectable()
export class FindAllSelectedClientsUseCase {
  constructor(private readonly repository: SelectedClientOrmRepository) {}

  async execute(
    page: number = 1,
  ): Promise<{ data: { clientId: number }[]; total: number }> {
    return this.repository.findAll(page);
  }
}
