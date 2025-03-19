import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientOrmRepository } from '../../infrastructure/persistence/client.orm-repository';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class FindClientUseCase {
  constructor(private readonly repository: ClientOrmRepository) {}

  async execute(id: number): Promise<Client> {
    const client = await this.repository.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return client;
  }
}
