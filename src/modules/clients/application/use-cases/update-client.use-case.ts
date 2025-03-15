import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly repository: ClientRepository) {}

  async execute(id: number, data: UpdateClientDto): Promise<Client> {
    const client = await this.repository.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return this.repository.update(id, data);
  }
}
