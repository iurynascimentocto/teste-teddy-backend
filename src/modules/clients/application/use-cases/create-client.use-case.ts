import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { CreateClientDto } from '../dtos/create-client.dto';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly repository: ClientRepository) {}

  async execute(data: CreateClientDto): Promise<Client> {
    return this.repository.create(data);
  }
}
