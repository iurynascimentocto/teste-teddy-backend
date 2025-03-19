import { Test, TestingModule } from '@nestjs/testing';
import { FindClientUseCase } from '../find-client.use-case';
import { ClientOrmRepository } from '../../../infrastructure/persistence/client.orm-repository';
import { Client } from '../../../domain/entities/client.entity';
import { NotFoundException } from '@nestjs/common';

describe('FindClientUseCase', () => {
  let useCase: FindClientUseCase;
  let repository: ClientOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindClientUseCase,
        {
          provide: ClientOrmRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<FindClientUseCase>(FindClientUseCase);
    repository = module.get<ClientOrmRepository>(ClientOrmRepository);
  });

  it('deve encontrar um cliente pelo ID', async () => {
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

    const result = await useCase.execute(1);

    expect(result).toEqual(client);
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro caso o cliente não seja encontrado', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(99)).rejects.toThrow(NotFoundException);
  });
});
