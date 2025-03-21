import { Test, TestingModule } from '@nestjs/testing';
import { FindAllSelectedClientsUseCase } from '../find-all-selected-clients.use-case';
import { SelectedClientOrmRepository } from '../../../infrastructure/persistence/selected-clients.orm-repository';
import { Client } from '../../../../clients/domain/entities/client.entity';

describe('FindAllSelectedClientsUseCase', () => {
  let useCase: FindAllSelectedClientsUseCase;
  let repository: SelectedClientOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllSelectedClientsUseCase,
        {
          provide: SelectedClientOrmRepository,
          useValue: { findAll: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<FindAllSelectedClientsUseCase>(
      FindAllSelectedClientsUseCase,
    );
    repository = module.get<SelectedClientOrmRepository>(
      SelectedClientOrmRepository,
    );
  });

  it('deve listar os clientes selecionados', async () => {
    const clients = [
      { id: 1, name: 'João' },
      { id: 2, name: 'Maria' },
    ] as Client[];

    jest.spyOn(repository, 'findAll').mockResolvedValue({
      data: clients,
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
      limit: 16,
    });

    const result = await useCase.execute(1);

    expect(result.data).toHaveLength(2);
    expect(result.totalItems).toBe(2);
  });
});
