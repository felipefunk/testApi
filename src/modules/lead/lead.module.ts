import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LeadService } from './lead.service';

@Module({
  imports: [PrismaModule],
  controllers: [LeadController],
  providers: [LeadService],
  exports: [LeadService],
})
export class LeadModule {}
