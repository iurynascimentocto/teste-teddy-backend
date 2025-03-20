import { Controller, Post, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddRemoveSelectedClientUseCase } from '../../application/use-cases/add-remove-selected-client.use-case';
import { FindAllSelectedClientsUseCase } from '../../application/use-cases/find-all-selected-clients.use-case';
import { SelectedClientViewModel } from '../view-models/selected-client.view-model';

@ApiTags('selected-clients')
@Controller('selected-clients')
export class SelectedClientsController {
  constructor(
    private readonly addRemoveUseCase: AddRemoveSelectedClientUseCase,
    private readonly findAllUseCase: FindAllSelectedClientsUseCase,
  ) {}

  @ApiOperation({
    summary: 'Adicionar ou remover um cliente da lista de selecionados',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente adicionado ou removido com sucesso',
    type: SelectedClientViewModel,
  })
  @Post(':clientId')
  async toggleClient(@Param('clientId') clientId: number) {
    const client = await this.addRemoveUseCase.execute(clientId);
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
}
