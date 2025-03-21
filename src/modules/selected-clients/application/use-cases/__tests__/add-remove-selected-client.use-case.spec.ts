import { Test, TestingModule } from '@nestjs/testing';
import { CreateSelectedClientUseCase } from '../create-selected-client.use-case';
import { SelectedClientOrmRepository } from '../../../infrastructure/persistence/selected-clients.orm-repository';
import { Client } from '../../../../clients/domain/entities/client.entity';

describe('AddRemoveSelectedClientUseCase', () => {
  let useCase: CreateSelectedClientUseCase;
  let repository: SelectedClientOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSelectedClientUseCase,
        {
          provide: SelectedClientOrmRepository,
          useValue: { create: jest.fn(), remove: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<CreateSelectedClientUseCase>(
      CreateSelectedClientUseCase,
    );
    repository = module.get<SelectedClientOrmRepository>(
      SelectedClientOrmRepository,
    );
  });

  it('deve adicionar um cliente selecionado', async () => {
    const client = { id: 1, name: 'João' } as Client;

    jest.spyOn(repository, 'create').mockResolvedValue(client);

    const result = await useCase.execute(client.id);

    expect(result).toEqual(client);
  });

  it('deve remover um cliente selecionado', async () => {
    jest.spyOn(repository, 'remove').mockResolvedValue(null);

    const result = await useCase.execute(1);

    expect(result).toBeUndefined();
  });
});
