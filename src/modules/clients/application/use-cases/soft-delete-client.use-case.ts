import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientOrmRepository } from '../../infrastructure/persistence/client.orm-repository';

@Injectable()
export class SoftDeleteClientUseCase {
  constructor(private readonly repository: ClientOrmRepository) {}

  async execute(id: number): Promise<void> {
    const client = await this.repository.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    await this.repository.softDelete(id);
  }
}
