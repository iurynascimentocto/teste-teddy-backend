import { Injectable } from '@nestjs/common';
import { ClientOrmRepository } from '../../infrastructure/persistence/client.orm-repository';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class FindAllClientsUseCase {
  constructor(private readonly repository: ClientOrmRepository) {}

  async execute(page: number = 1): Promise<{ data: Client[]; total: number }> {
    return this.repository.findAll(page);
  }
}
