import { PartialType } from '@nestjs/swagger';
import { CreateNegotiationDto } from './create-negotiation.dto';

export class UpdateNegotiationDto extends PartialType(CreateNegotiationDto) {}
