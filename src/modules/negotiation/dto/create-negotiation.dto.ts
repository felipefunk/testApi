import { NegotiationStatusAndFunnelStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

// export enum NegotiationStatusAndFunnelStatus {
//   EM_NEGOCIACAO = 'EM_NEGOCIAÇÃO',
//   PERDIDA = 'PERDIDA',
//   GANHA = 'GANHA',
// }

export class CreateNegotiationDto {
  @ApiProperty({
    example: '2ª via da fatura',
    description: 'O resultado final será: Nome do Lead + O que ele quer',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'WIN',
    description: 'Pode ser um destes status: UNDER_NEGOTIATION | LOST | WIN',
    required: false,
  })
  @IsOptional()
  @IsEnum(NegotiationStatusAndFunnelStatus)
  status?: NegotiationStatusAndFunnelStatus;

  @ApiProperty({
    example: '12',
    description: 'ID do lead para registrar negociação',
  })
  @IsInt()
  @IsNotEmpty()
  leadId: number;

  // @ApiProperty({
  //   example: '2',
  //   description: 'ID do funil',
  // })
  // @IsInt()
  // @IsNotEmpty()
  // funnelId: number;
}
