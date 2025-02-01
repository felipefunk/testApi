import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFunnelDto } from './dto/create-funnel.dto';
import { UpdateFunnelDto } from './dto/update-funnel.dto';
import { PrismaExceptionHandler } from 'src/common/prisma-exception.handler';
import { NegotiationStatusAndFunnelStatus } from '@prisma/client';

@Injectable()
export class FunnelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFunnelDto) {
    try {
      return await this.prisma.funnel.create({
        data: {
          name: data.name,
        },
      });
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }

  async update(id: number, data: UpdateFunnelDto) {
    try {
      return await this.prisma.funnel.update({
        where: { id },
        data,
      });
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }

  async findOneByName(name: NegotiationStatusAndFunnelStatus) {
    const negotiation = await this.prisma.funnel.findUnique({
      where: { name },
    });
    if (!negotiation) {
      throw new NotFoundException('Funnil não encontrado');
    }
    return negotiation;
  }

  async findOneById(id: number) {
    const negotiation = await this.prisma.funnel.findUnique({
      where: { id },
    });
    if (!negotiation) {
      throw new NotFoundException('Funnil não encontrado');
    }
    return negotiation;
  }
}
