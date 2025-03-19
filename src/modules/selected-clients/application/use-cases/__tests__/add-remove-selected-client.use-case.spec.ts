import { Test, TestingModule } from '@nestjs/testing';
import { AddRemoveSelectedClientUseCase } from '../add-remove-selected-client.use-case';
import { SelectedClientOrmRepository } from '../../../infrastructure/persistence/selected-clients.orm-repository';
import { Client } from '../../../../clients/domain/entities/client.entity';

describe('AddRemoveSelectedClientUseCase', () => {
  let useCase: AddRemoveSelectedClientUseCase;
  let repository: SelectedClientOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddRemoveSelectedClientUseCase,
        {
          provide: SelectedClientOrmRepository,
          useValue: { addOrRemove: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get<AddRemoveSelectedClientUseCase>(
      AddRemoveSelectedClientUseCase,
    );
    repository = module.get<SelectedClientOrmRepository>(
      SelectedClientOrmRepository,
    );
  });

  it('deve adicionar um cliente selecionado', async () => {
    const client = { id: 1, name: 'João' } as Client;

    jest.spyOn(repository, 'addOrRemove').mockResolvedValue(client);

    const result = await useCase.execute(client.id);

    expect(result).toEqual(client);
  });

  it('deve remover um cliente selecionado', async () => {
    jest.spyOn(repository, 'addOrRemove').mockResolvedValue(null);

    const result = await useCase.execute(1);

    expect(result).toBeNull();
  });
});
