import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateSelectedClientDto {
  @ApiProperty({
    example: 1,
    description: 'ID do cliente que será atualizado na lista de selecionados',
  })
  @IsInt()
  clientId: number;
}
