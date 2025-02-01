import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get('byId/:id')
  findOneById(@Param('id') id: string) {
    const checkedId = Number(id);
    if (!checkedId) {
      throw new BadRequestException(['O ID precisa ser válido.']);
    }
    return this.leadService.findOneBy({ id: checkedId }, true);
  }

  @Get('byName/:name')
  findOneByName(@Param('name') name: string) {
    return this.leadService.findOneBy({ name }, true);
  }

  @Get('byEmail/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.leadService.findOneBy({ email }, true);
  }

  @Get('byPhone/:phone')
  findOneByPhone(@Param('phone') phone: string) {
    return this.leadService.findOneBy({ phone }, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(Number(id), updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(Number(id));
  }
}
