import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../../domain/repositories/client.repository';

@Injectable()
export class SoftDeleteClientUseCase {
  constructor(private readonly repository: ClientRepository) {}

  async execute(id: number): Promise<void> {
    const client = await this.repository.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    await this.repository.softDelete(id);
  }
}
