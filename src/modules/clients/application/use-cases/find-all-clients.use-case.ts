import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class FindAllClientsUseCase {
  constructor(private readonly repository: ClientRepository) {}

  async execute(page: number = 1): Promise<{ data: Client[]; total: number }> {
    return this.repository.findAll(page);
  }
}
