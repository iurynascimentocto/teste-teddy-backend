import { Injectable } from '@nestjs/common';
import { ClientOrmRepository } from '../../infrastructure/persistence/client.orm-repository';

@Injectable()
export class FindAllClientsUseCase {
  constructor(private readonly repository: ClientOrmRepository) {}

  async execute(page: number = 1, limit: number = 16) {
    return this.repository.findAll(page, limit);
  }
}
