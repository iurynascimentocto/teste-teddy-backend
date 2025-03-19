import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../domain/entities/client.entity';

export class ClientViewModel {
  @ApiProperty({ example: 1, description: 'ID do cliente' })
  id: number;

  @ApiProperty({ example: 'Marcos Oliveira', description: 'Nome do cliente' })
  name: string;

  @ApiProperty({
    example: 'R$ 4.500,00',
    description: 'Salário do cliente formatado',
  })
  salary_price: string;

  @ApiProperty({
    example: 'R$ 10.000,00',
    description: 'Preço da empresa formatado',
  })
  company_price: string;

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
    this.salary_price = this.formatCurrency(client.salary_price);
    this.company_price = this.formatCurrency(client.company_price);
    this.created_at = client.created_at.toISOString();
    this.updated_at = client.updated_at.toISOString();
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
      .format(value)
      .trim();
  }

  static toViewModel(client: Client): ClientViewModel {
    return new ClientViewModel(client);
  }

  static toListViewModel(clients: Client[]): ClientViewModel[] {
    return clients.map((client) => new ClientViewModel(client));
  }
}
