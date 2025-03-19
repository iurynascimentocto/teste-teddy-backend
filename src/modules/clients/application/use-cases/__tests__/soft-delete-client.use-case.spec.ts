import { Test, TestingModule } from '@nestjs/testing';
import { SoftDeleteClientUseCase } from '../soft-delete-client.use-case';
import { ClientOrmRepository } from '../../../infrastructure/persistence/client.orm-repository';
import { NotFoundException } from '@nestjs/common';
import { Client } from '../../../domain/entities/client.entity';

describe('SoftDeleteClientUseCase', () => {
  let useCase: SoftDeleteClientUseCase;
  let repository: ClientOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoftDeleteClientUseCase,
        {
          provide: ClientOrmRepository,
          useValue: {
            findOne: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<SoftDeleteClientUseCase>(SoftDeleteClientUseCase);
    repository = module.get<ClientOrmRepository>(ClientOrmRepository);
  });

  it('deve excluir logicamente um cliente', async () => {
    const client: Client = {
      id: 1,
      name: 'João',
      salary_price: 5000,
      company_price: 15000,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(client);
    jest.spyOn(repository, 'softDelete').mockResolvedValue(undefined);

    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(repository.softDelete).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro se o cliente não existir', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(99)).rejects.toThrow(NotFoundException);
  });
});
