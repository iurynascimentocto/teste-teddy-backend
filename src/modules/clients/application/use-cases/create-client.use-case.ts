import { Injectable } from '@nestjs/common';
import { ClientOrmRepository } from '../../infrastructure/persistence/client.orm-repository';
import { CreateClientDto } from '../dtos/create-client.dto';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly repository: ClientOrmRepository) {}

  async execute(data: CreateClientDto): Promise<Client> {
    return this.repository.create(data);
  }
}
