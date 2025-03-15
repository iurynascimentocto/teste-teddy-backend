import { Client } from '../../domain/entities/client.entity';

export class ClientViewModel {
  id: number;
  name: string;
  salario: string; // Formatado como moeda (R$)
  empresa: string; // Formatado como moeda (R$)
  createdAt: string;
  updatedAt: string;

  constructor(client: Client) {
    this.id = client.id;
    this.name = client.name;
    this.salario = this.formatCurrency(client.salario);
    this.empresa = this.formatCurrency(client.empresa);
    this.createdAt = client.created_at.toISOString();
    this.updatedAt = client.updated_at.toISOString();
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  static toViewModel(client: Client): ClientViewModel {
    return new ClientViewModel(client);
  }

  static toListViewModel(clients: Client[]): ClientViewModel[] {
    return clients.map((client) => new ClientViewModel(client));
  }
}
