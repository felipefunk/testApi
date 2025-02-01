import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { NegotiationStatusAndFunnelStatus } from '@prisma/client';

export class CreateFunnelDto {
  @ApiProperty({
    example: 'LOST',
    description: 'Funil de vendas. Nome único, aceito apenas: WIN e LOST',
  })
  @IsEnum(NegotiationStatusAndFunnelStatus)
  @IsNotEmpty()
  name: NegotiationStatusAndFunnelStatus;
}
