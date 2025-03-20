import { Client } from '../entities/client.entity';

export interface ClientRepository {
  create(data: Partial<Client>): Promise<Client>;
  findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: Client[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }>;
  findOne(id: number): Promise<Client | null>;
  update(id: number, data: Partial<Client>): Promise<Client>;
  softDelete(id: number): Promise<void>;
}
