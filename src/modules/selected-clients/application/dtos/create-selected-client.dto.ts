import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateSelectedClientDto {
  @ApiProperty({
    example: 1,
    description:
      'ID do cliente que será adicionado ou removido da lista de selecionados',
  })
  @IsInt()
  clientId: number;
}
