import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { UpdateNegotiationDto } from './dto/update-negotiation.dto';
import { PrismaExceptionHandler } from 'src/common/prisma-exception.handler';
import { NegotiationStatusAndFunnelStatus } from '@prisma/client';
import { FunnelService } from '../funnel/funnel.service';
import { LeadService } from '../lead/lead.service';

@Injectable()
export class NegotiationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly funnelService: FunnelService,
    private readonly leadService: LeadService,
  ) {}

  async create(data: CreateNegotiationDto) {
    const [funnelByStatus, leadData] = await Promise.all([
      this.funnelService.findOneByName(data.status || 'UNDER_NEGOTIATION'),
      this.leadService.findOneBy({ id: data.leadId }, true),
    ]);

    const completelyTitle = `${leadData?.name} + ${data.title}`;

    try {
      return await this.prisma.negotiation.create({
        data: {
          title: completelyTitle,
          status: data.status || undefined,
          leadId: data.leadId,
          funnelId: funnelByStatus.id,
        },
      });
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }

  async findOne(id: number) {
    const negotiation = await this.prisma.negotiation.findUnique({
      where: { id },
    });
    if (!negotiation) {
      throw new NotFoundException('Negociação não encontrada');
    }
    return negotiation;
  }

  async findAllBy({
    status,
    leadId,
    funnelId,
  }: {
    status?: NegotiationStatusAndFunnelStatus;
    leadId?: number;
    funnelId?: number;
  }) {
    const dataFromBase = await this.prisma.negotiation.findMany({
      where: { status, leadId, funnelId },
    });

    if (!dataFromBase) {
      throw new BadRequestException(['Negociação não encontrada']);
    }

    return dataFromBase;
  }

  async update(id: number, data: UpdateNegotiationDto) {
    const funnelByStatus = data.status
      ? await this.funnelService.findOneByName(data.status)
      : undefined;

    try {
      return await this.prisma.negotiation.update({
        where: { id },
        data: { ...data, funnelId: funnelByStatus?.id },
      });
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.negotiation.delete({ where: { id } });
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }

  async moveToFunnelByStatusName(
    id: number,
    statusName: NegotiationStatusAndFunnelStatus,
  ) {
    const funnelByStatus = await this.funnelService.findOneByName(statusName);

    try {
      return await this.prisma.negotiation.update({
        where: { id },
        data: { status: statusName, funnelId: funnelByStatus?.id },
      });
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }

  async moveToFunnelByFunnelId(id: number, funnelId: number) {
    const funnelByStatus = await this.funnelService.findOneById(funnelId);

    try {
      return await this.prisma.negotiation.update({
        where: { id },
        data: { status: funnelByStatus.name, funnelId },
      });
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }
}
