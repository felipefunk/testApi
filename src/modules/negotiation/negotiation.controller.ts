import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NegotiationService } from './negotiation.service';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { UpdateNegotiationDto } from './dto/update-negotiation.dto';
import { NegotiationStatusAndFunnelStatus } from '@prisma/client';

@Controller('negotiations')
export class NegotiationController {
  constructor(private readonly negotiationService: NegotiationService) {}

  @Post()
  create(@Body() createNegotiationDto: CreateNegotiationDto) {
    return this.negotiationService.create(createNegotiationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negotiationService.findOne(Number(id));
  }

  @Get('status/:status')
  findAllByStatus(@Param('status') status: NegotiationStatusAndFunnelStatus) {
    return this.negotiationService.findAllBy({ status });
  }

  @Get('lead/:leadId')
  findAllByLeadId(@Param('leadId') leadId: string) {
    return this.negotiationService.findAllBy({ leadId: Number(leadId) });
  }

  @Get('funnel/:funnelId')
  findAllByFunnelId(@Param('funnelId') funnelId: string) {
    return this.negotiationService.findAllBy({ funnelId: Number(funnelId) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNegotiationDto: UpdateNegotiationDto,
  ) {
    return this.negotiationService.update(Number(id), updateNegotiationDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.negotiationService.remove(Number(id));
  // }

  @Patch(':id/funnel/:funnelId')
  moveToFunnelByFunnelId(
    @Param('id') id: string,
    @Param('funnelId') funnelId: string,
  ) {
    return this.negotiationService.moveToFunnelByFunnelId(
      Number(id),
      Number(funnelId),
    );
  }

  @Patch(':id/status/:statusName')
  moveToFunnelByStatusName(
    @Param('id') id: string,
    @Param('statusName') statusName: NegotiationStatusAndFunnelStatus,
  ) {
    return this.negotiationService.moveToFunnelByStatusName(
      Number(id),
      statusName,
    );
  }
}
