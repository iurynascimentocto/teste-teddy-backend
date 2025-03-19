import { Controller, Post, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddRemoveSelectedClientUseCase } from '../../application/use-cases/add-remove-selected-client.use-case';
import { FindAllSelectedClientsUseCase } from '../../application/use-cases/find-all-selected-clients.use-case';

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
  })
  @Post(':clientId')
  async toggleClient(@Param('clientId') clientId: number) {
    return this.addRemoveUseCase.execute(clientId);
  }

  @ApiOperation({ summary: 'Listar clientes selecionados com paginação' })
  @ApiResponse({ status: 200, description: 'Lista de clientes selecionados' })
  @Get()
  async findAll(@Query('page') page: number = 1) {
    return this.findAllUseCase.execute(page);
  }
}
