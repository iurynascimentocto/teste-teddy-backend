import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../../clients/domain/entities/client.entity';

export class SelectedClientViewModel {
  @ApiProperty({ example: 1, description: 'ID do cliente' })
  id: number;

  @ApiProperty({ example: 'Marcos Oliveira', description: 'Nome do cliente' })
  name: string;

  @ApiProperty({
    example: 5000.53,
    description: 'Salário do cliente em número',
  })
  salary_price: number;

  @ApiProperty({ example: 15000.75, description: 'Preço da empresa em número' })
  company_price: number;

  @ApiProperty({
    example: '2025-03-17T12:00:00.000Z',
    description: 'Data de criação do cliente',
  })
  created_at: string;

  @ApiProperty({
    example: '2025-03-17T12:30:00.000Z',
    description: 'Data da última atualização',
  })
  updated_at: string;

  constructor(client: Client) {
    this.id = client.id;
    this.name = client.name;
    this.salary_price = client.salary_price;
    this.company_price = client.company_price;
    this.created_at = client.created_at.toISOString();
    this.updated_at = client.updated_at.toISOString();
  }

  static toViewModel(client: Client): SelectedClientViewModel {
    return new SelectedClientViewModel(client);
  }

  static toListViewModel(clients: Client[]): SelectedClientViewModel[] {
    return clients.map((client) => new SelectedClientViewModel(client));
  }
}
