import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  salario: number;

  @IsNumber()
  @IsPositive()
  empresa: number;
}
