import { Controller, Post, Get, Param, Query, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSelectedClientUseCase } from '../../application/use-cases/create-selected-client.use-case';
import { FindAllSelectedClientsUseCase } from '../../application/use-cases/find-all-selected-clients.use-case';
import { SelectedClientViewModel } from '../view-models/selected-client.view-model';
import { RemoveSelectedClientUseCase } from '../../application/use-cases/remove-selected-client.use-case';
import { RemoveAllSelectedClientUseCase } from '../../application/use-cases/remove-all-selected-client.use-case';

@ApiTags('selected-clients')
@Controller('selected-clients')
export class SelectedClientsController {
  constructor(
    private readonly createUseCase: CreateSelectedClientUseCase,
    private readonly findAllUseCase: FindAllSelectedClientsUseCase,
    private readonly removeUseCase: RemoveSelectedClientUseCase,
    private readonly removeAllUseCase: RemoveAllSelectedClientUseCase,
  ) {}

  @ApiOperation({
    summary: 'Adicionar um cliente da lista de selecionados',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente adicionado ou removido com sucesso',
    type: SelectedClientViewModel,
  })
  @Post(':clientId')
  async create(@Param('clientId') clientId: number) {
    const client = await this.createUseCase.execute(clientId);
    return client ? SelectedClientViewModel.toViewModel(client) : null;
  }

  @ApiOperation({ summary: 'Listar clientes selecionados com paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes selecionados',
    type: [SelectedClientViewModel],
  })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 16,
  ) {
    const result = await this.findAllUseCase.execute(
      Number(page),
      Number(limit),
    );
    return {
      data: SelectedClientViewModel.toListViewModel(result.data),
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      limit: result.limit,
    };
  }

  @ApiOperation({ summary: 'Remover um cliente da lista de selecionados' })
  @ApiResponse({ status: 204, description: 'Cliente removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.removeUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Remover todos clientes da lista de selecionados' })
  @ApiResponse({ status: 204, description: 'Clientes removidos com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Delete()
  async removeAll() {
    return this.removeAllUseCase.execute();
  }
}
