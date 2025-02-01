import { Controller, Post, Patch, Body, Param } from '@nestjs/common';
import { FunnelService } from './funnel.service';
import { CreateFunnelDto } from './dto/create-funnel.dto';
import { UpdateFunnelDto } from './dto/update-funnel.dto';

@Controller('funnels')
export class FunnelController {
  constructor(private readonly funnelService: FunnelService) {}

  @Post()
  create(@Body() createFunnelDto: CreateFunnelDto) {
    return this.funnelService.create(createFunnelDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFunnelDto: UpdateFunnelDto) {
    return this.funnelService.update(+id, updateFunnelDto);
  }
}
