import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectedClient } from '../../domain/entities/selected-client.entity';
import { SelectedClientRepository } from '../../domain/repositories/selected-client.repository';

@Injectable()
export class SelectedClientOrmRepository implements SelectedClientRepository {
  constructor(
    @InjectRepository(SelectedClient)
    private readonly repository: Repository<SelectedClient>,
  ) {}

  async addOrRemove(clientId: number): Promise<void> {
    const existing = await this.repository.findOne({ where: { clientId } });

    if (existing) {
      await this.repository.delete({ clientId });
    } else {
      const newEntry = this.repository.create({ clientId });
      await this.repository.save(newEntry);
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 16,
  ): Promise<{ data: SelectedClient[]; total: number }> {
    const [data, total] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return { data, total };
  }
}
