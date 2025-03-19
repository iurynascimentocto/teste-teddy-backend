import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientOrmRepository } from '../../infrastructure/persistence/client.orm-repository';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly repository: ClientOrmRepository) {}

  async execute(id: number, data: UpdateClientDto): Promise<Client> {
    const client = await this.repository.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return this.repository.update(id, data);
  }
}
