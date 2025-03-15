import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../domain/entities/client.entity';
import { ClientRepository } from '../../domain/repositories/client.repository';

@Injectable()
export class ClientOrmRepository implements ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  async create(data: Partial<Client>): Promise<Client> {
    const client = this.repository.create(data);
    return this.repository.save(client);
  }

  async findAll(page: number = 1): Promise<{ data: Client[]; total: number }> {
    const take = 16;
    const [data, total] = await this.repository.findAndCount({
      where: { deleted_at: null },
      take,
      skip: (page - 1) * take,
      order: { created_at: 'DESC' },
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Client | null> {
    return this.repository.findOne({ where: { id, deleted_at: null } });
  }

  async update(id: number, data: Partial<Client>): Promise<Client> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
