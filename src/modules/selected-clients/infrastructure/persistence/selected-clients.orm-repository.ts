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

  async addOrRemove(clientId: number): Promise<Client | null> {
    const existing = await this.selectedRepository.findOne({
      where: { clientId },
    });

    if (existing) {
      await this.selectedRepository.delete({ clientId });
      return null;
    }

    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!client) return null;

    const newEntry = this.selectedRepository.create({ clientId });
    await this.selectedRepository.save(newEntry);

    return client;
  }

  async findAll(
    page: number = 1,
    limit: number = 16,
  ): Promise<{ data: Client[]; total: number }> {
    const selectedClients = await this.selectedRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    const clientIds = selectedClients.map((sc) => sc.clientId);

    const clients = await this.clientRepository.findByIds(clientIds);

    return { data: clients, total: clientIds.length };
  }
}
