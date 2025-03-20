import { SelectedClientViewModel } from '../selected-client.view-model';
import { Client } from '../../../../clients/domain/entities/client.entity';

describe('SelectedClientViewModel', () => {
  it('deve formatar um cliente corretamente', () => {
    const client: Client = {
      id: 1,
      name: 'Marcos Oliveira',
      salary_price: 5000,
      company_price: 15000,
      created_at: new Date('2025-03-17T12:00:00.000Z'),
      updated_at: new Date('2025-03-17T12:30:00.000Z'),
      deleted_at: undefined,
    };

    const viewModel = SelectedClientViewModel.toViewModel(client);

    expect(viewModel.id).toBe(client.id);
    expect(viewModel.name).toBe(client.name);
    expect(viewModel.salary_price).toBe(5000);
    expect(viewModel.company_price).toBe(15000);
    expect(viewModel.created_at).toBe('2025-03-17T12:00:00.000Z');
    expect(viewModel.updated_at).toBe('2025-03-17T12:30:00.000Z');
  });

  it('deve converter uma lista de clientes para uma lista de ViewModels', () => {
    const clients: Client[] = [
      {
        id: 1,
        name: 'Marcos Oliveira',
        salary_price: 5000,
        company_price: 15000,
        created_at: new Date('2025-03-17T12:00:00.000Z'),
        updated_at: new Date('2025-03-17T12:30:00.000Z'),
        deleted_at: undefined,
      },
      {
        id: 2,
        name: 'Maria Souza',
        salary_price: 7000,
        company_price: 20000,
        created_at: new Date('2025-03-18T14:00:00.000Z'),
        updated_at: new Date('2025-03-18T14:30:00.000Z'),
        deleted_at: undefined,
      },
    ];

    const viewModels = SelectedClientViewModel.toListViewModel(clients);

    expect(viewModels).toHaveLength(2);
    expect(viewModels[0].name).toBe('Marcos Oliveira');
    expect(viewModels[0].salary_price).toBe(5000);
    expect(viewModels[1].name).toBe('Maria Souza');
    expect(viewModels[1].salary_price).toBe(7000);
  });
});
