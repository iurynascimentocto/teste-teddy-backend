import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Marcos Oliveira', description: 'Nome do cliente' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 4500.0,
    description: 'Salário do cliente em R$',
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  salary_price: number;

  @ApiProperty({
    example: 10000.0,
    description: 'Preço da empresa em R$',
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  company_price: number;
}
