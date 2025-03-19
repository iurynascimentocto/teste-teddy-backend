import { Test, TestingModule } from '@nestjs/testing';
import { FindAllClientsUseCase } from '../find-all-clients.use-case';
import { ClientOrmRepository } from '../../../infrastructure/persistence/client.orm-repository';
import { Client } from '../../../domain/entities/client.entity';

describe('FindAllClientsUseCase', () => {
  let useCase: FindAllClientsUseCase;
  let repository: ClientOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllClientsUseCase,
        {
          provide: ClientOrmRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FindAllClientsUseCase>(FindAllClientsUseCase);
    repository = module.get<ClientOrmRepository>(ClientOrmRepository);
  });

  it('deve listar os clientes corretamente', async () => {
    const clients: Client[] = [
      {
        id: 1,
        name: 'João',
        salary_price: 5000,
        company_price: 15000,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: undefined,
      },
      {
        id: 2,
        name: 'Maria',
        salary_price: 6000,
        company_price: 20000,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: undefined,
      },
    ];

    jest
      .spyOn(repository, 'findAll')
      .mockResolvedValue({ data: clients, total: 2 });

    const result = await useCase.execute(1);

    expect(result.data).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(repository.findAll).toHaveBeenCalledWith(1);
  });
});
