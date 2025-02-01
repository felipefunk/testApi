import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadFind } from './dto/lead.types';
import { PrismaExceptionHandler } from 'src/common/prisma-exception.handler';

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLeadDto) {
    const forceCreateLead = data.force;

    if (!forceCreateLead) {
      const previousLead = await this.findOneBy(
        {
          phone: data.phone,
          email: data.email,
        },
        false,
      );

      if (previousLead) {
        throw new BadRequestException([
          'Já existe um lead com estes dados de cadastro',
        ]);
      }
    }

    return this.prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });
  }

  async findAll() {
    return this.prisma.lead.findMany();
  }

  async findOneBy({ id, name, email, phone }: LeadFind, throwError: boolean) {
    const dataFromBase = await this.prisma.lead.findFirst({
      where: { id, name, email, phone },
    });
    console.log(!dataFromBase && throwError);
    console.log(throwError);
    if (!dataFromBase && throwError) {
      throw new BadRequestException(['Lead não encontrado']);
    }

    return dataFromBase;
  }

  async update(id: number, data: UpdateLeadDto) {
    try {
      const updatedUser = await this.prisma.lead.update({
        where: { id },
        data,
      });
      return updatedUser;
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.lead.delete({ where: { id } });
      return deletedUser;
    } catch (error) {
      PrismaExceptionHandler.handle(error);
    }
  }
}
