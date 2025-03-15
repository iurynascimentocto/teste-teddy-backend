import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateClientUseCase } from '../../application/use-cases/create-client.use-case';
import { FindAllClientsUseCase } from '../../application/use-cases/find-all-clients.use-case';
import { FindClientUseCase } from '../../application/use-cases/find-client.use-case';
import { UpdateClientUseCase } from '../../application/use-cases/update-client.use-case';
import { SoftDeleteClientUseCase } from '../../application/use-cases/soft-delete-client.use-case';
import { CreateClientDto } from '../../application/dtos/create-client.dto';
import { UpdateClientDto } from '../../application/dtos/update-client.dto';
import { ClientViewModel } from '../view-models/client.view-model';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly findAllClientsUseCase: FindAllClientsUseCase,
    private readonly findClientUseCase: FindClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly softDeleteClientUseCase: SoftDeleteClientUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateClientDto) {
    const client = await this.createClientUseCase.execute(data);
    return ClientViewModel.toViewModel(client);
  }

  @Get()
  async findAll(@Query('page') page: number = 1) {
    const { data, total } = await this.findAllClientsUseCase.execute(page);
    return {
      total,
      clients: ClientViewModel.toListViewModel(data),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const client = await this.findClientUseCase.execute(id);
    return ClientViewModel.toViewModel(client);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateClientDto) {
    const client = await this.updateClientUseCase.execute(id, data);
    return ClientViewModel.toViewModel(client);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: number) {
    return this.softDeleteClientUseCase.execute(id);
  }
}
