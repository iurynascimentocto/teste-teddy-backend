import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUseCase } from '../create-client.use-case';
import { ClientOrmRepository } from '../../../infrastructure/persistence/client.orm-repository';
import { CreateClientDto } from '../../dtos/create-client.dto';
import { Client } from '../../../domain/entities/client.entity';

describe('CreateClientUseCase', () => {
  let useCase: CreateClientUseCase;
  let repository: ClientOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUseCase,
        {
          provide: ClientOrmRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateClientUseCase>(CreateClientUseCase);
    repository = module.get<ClientOrmRepository>(ClientOrmRepository);
  });

  it('deve criar um cliente com sucesso', async () => {
    const dto: CreateClientDto = {
      name: 'Marcos Oliveira',
      salary_price: 4500.0,
      company_price: 10000.0,
    };

    const expectedClient: Client = {
      id: 1,
      name: dto.name,
      salary_price: dto.salary_price,
      company_price: dto.company_price,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
    };

    jest.spyOn(repository, 'create').mockResolvedValue(expectedClient);

    const result = await useCase.execute(dto);

    expect(result).toEqual(expectedClient);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });
});
