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

    const cleanString = (str: string) =>
      str.normalize('NFKC').replace(/\s/g, ''); // 🔹 Remove espaços e caracteres invisíveis

    expect(viewModel.id).toBe(client.id);
    expect(viewModel.name).toBe(client.name);
    expect(cleanString(viewModel.salary_price)).toBe(
      cleanString('R$ 5.000,00'),
    );
    expect(cleanString(viewModel.company_price)).toBe(
      cleanString('R$ 15.000,00'),
    );
  });
});
