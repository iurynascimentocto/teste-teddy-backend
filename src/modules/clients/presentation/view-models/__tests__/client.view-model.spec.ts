import { Client } from '../../../domain/entities/client.entity';
import { ClientViewModel } from '../client.view-model';

describe('ClientViewModel', () => {
  it('deve formatar um cliente corretamente', () => {
    const client: Client = {
      id: 1,
      name: 'João',
      salary_price: 5000,
      company_price: 15000,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
    };

    const viewModel = ClientViewModel.toViewModel(client);

    expect(viewModel.id).toBe(client.id);
    expect(viewModel.name).toBe(client.name);
    expect(viewModel.salary_price).toBe(5000);
    expect(viewModel.company_price).toBe(15000);
  });
});
