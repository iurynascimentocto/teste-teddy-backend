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

  async findAll(page: number = 1, limit: number = 16) {
    const totalItems = await this.repository.count();
    const totalPages = Math.ceil(totalItems / limit);

    const data = await this.repository.find({
      where: { deleted_at: null },
      take: limit,
      skip: (page - 1) * limit,
      order: { created_at: 'DESC' },
    });

    return { data, totalItems, totalPages, currentPage: page, limit };
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
