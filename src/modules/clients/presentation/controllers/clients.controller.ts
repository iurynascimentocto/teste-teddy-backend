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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateClientUseCase } from '../../application/use-cases/create-client.use-case';
import { FindAllClientsUseCase } from '../../application/use-cases/find-all-clients.use-case';
import { FindClientUseCase } from '../../application/use-cases/find-client.use-case';
import { UpdateClientUseCase } from '../../application/use-cases/update-client.use-case';
import { SoftDeleteClientUseCase } from '../../application/use-cases/soft-delete-client.use-case';
import { CreateClientDto } from '../../application/dtos/create-client.dto';
import { UpdateClientDto } from '../../application/dtos/update-client.dto';
import { ClientViewModel } from '../view-models/client.view-model';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly findAllClientsUseCase: FindAllClientsUseCase,
    private readonly findClientUseCase: FindClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly softDeleteClientUseCase: SoftDeleteClientUseCase,
  ) {}

  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso',
    type: ClientViewModel,
  })
  @Post()
  async create(@Body() data: CreateClientDto) {
    const client = await this.createClientUseCase.execute(data);
    return ClientViewModel.toViewModel(client);
  }

  @ApiOperation({ summary: 'Listar clientes paginados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso',
    type: [ClientViewModel],
  })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 16,
  ) {
    const result = await this.findAllClientsUseCase.execute(
      Number(page),
      Number(limit),
    );
    return {
      data: ClientViewModel.toListViewModel(result.data),
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      limit: result.limit,
    };
  }

  @ApiOperation({ summary: 'Buscar um cliente pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado',
    type: ClientViewModel,
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const client = await this.findClientUseCase.execute(id);
    return ClientViewModel.toViewModel(client);
  }

  @ApiOperation({ summary: 'Atualizar um cliente' })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso',
    type: ClientViewModel,
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateClientDto) {
    const client = await this.updateClientUseCase.execute(id, data);
    return ClientViewModel.toViewModel(client);
  }

  @ApiOperation({ summary: 'Deletar um cliente (Soft Delete)' })
  @ApiResponse({ status: 204, description: 'Cliente deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Delete(':id')
  async softDelete(@Param('id') id: number) {
    return this.softDeleteClientUseCase.execute(id);
  }
}
