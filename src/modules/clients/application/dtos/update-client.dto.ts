import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({
    example: 'Carlos Souza',
    description: 'Novo nome do cliente',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 5000.0,
    description: 'Novo salário do cliente em R$',
    required: false,
  })
  salary_price?: number;

  @ApiProperty({
    example: 12000.0,
    description: 'Novo preço da empresa em R$',
    required: false,
  })
  company_price?: number;
}
