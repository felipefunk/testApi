import { Module } from '@nestjs/common';
import { NegotiationService } from './negotiation.service';
import { NegotiationController } from './negotiation.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { FunnelModule } from '../funnel/funnel.module';
import { LeadModule } from '../lead/lead.module';

@Module({
  imports: [PrismaModule, FunnelModule, LeadModule],
  controllers: [NegotiationController],
  providers: [NegotiationService],
  exports: [NegotiationService],
})
export class NegotiationModule {}
