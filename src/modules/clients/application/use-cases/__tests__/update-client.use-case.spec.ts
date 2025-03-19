import { Test, TestingModule } from '@nestjs/testing';
import { UpdateClientUseCase } from '../update-client.use-case';
import { ClientOrmRepository } from '../../../infrastructure/persistence/client.orm-repository';
import { Client } from '../../../domain/entities/client.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateClientDto } from '../../dtos/update-client.dto';

describe('UpdateClientUseCase', () => {
  let useCase: UpdateClientUseCase;
  let repository: ClientOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClientUseCase,
        {
          provide: ClientOrmRepository,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateClientUseCase>(UpdateClientUseCase);
    repository = module.get<ClientOrmRepository>(ClientOrmRepository);
  });

  it('deve atualizar um cliente existente', async () => {
    const dto: UpdateClientDto = { name: 'Carlos Souza', salary_price: 5500 };
    const client: Client = {
      id: 1,
      name: 'João',
      salary_price: 5000,
      company_price: 15000,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
    };
    const updatedClient: Client = { ...client, ...dto, updated_at: new Date() };

    jest.spyOn(repository, 'findOne').mockResolvedValue(client);
    jest.spyOn(repository, 'update').mockResolvedValue(updatedClient);

    const result = await useCase.execute(1, dto);

    expect(result).toEqual(updatedClient);
    expect(repository.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar erro se o cliente não existir', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(99, { name: 'Novo Nome' })).rejects.toThrow(
      NotFoundException,
    );
  });
});
