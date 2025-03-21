import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectedClient } from '../../domain/entities/selected-client.entity';
import { Client } from '../../../clients/domain/entities/client.entity';

@Injectable()
export class SelectedClientOrmRepository {
  constructor(
    @InjectRepository(SelectedClient)
    private readonly selectedRepository: Repository<SelectedClient>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(clientId: number): Promise<Client | null> {
    const existing = await this.selectedRepository.findOne({
      where: { clientId },
    });

    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!client) return null;

    if (existing) {
      return client;
    }

    const newEntry = this.selectedRepository.create({ clientId });
    await this.selectedRepository.save(newEntry);

    return client;
  }

  async remove(clientId: number): Promise<void> {
    await this.selectedRepository.delete({ clientId });
    return null;
  }

  async findAll(page: number = 1, limit: number = 16) {
    const totalItems = await this.selectedRepository.count();
    const totalPages = Math.ceil(totalItems / limit);

    const selectedClients = await this.selectedRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    const clientIds = selectedClients.map((sc) => sc.clientId);
    const clients = await this.clientRepository.findByIds(clientIds);

    return {
      data: clients,
      totalItems,
      totalPages,
      currentPage: page,
      limit,
    };
  }

  async removeAll(): Promise<void> {
    await this.selectedRepository.clear();
    return null;
  }
}
