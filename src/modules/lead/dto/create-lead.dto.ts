import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ example: 'Felipe Funk', description: 'Nome do lead' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'teste@teste.com.br', description: 'E-mail do lead' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '51999999999', description: 'Telefone do lead' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'false',
    description:
      'Utilize para forçar criação do lead mesmo com dados de cadastro já existentes.',
    required: false,
  })
  @IsBoolean()
  force?: boolean;
}
