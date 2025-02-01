import { Module } from '@nestjs/common';
// import { AppController } from './XXXXapp.controller';
// import { AppService } from './XXXXapp.service';
import { FunnelModule } from './modules/funnel/funnel.module';
import { LeadModule } from './modules/lead/lead.module';
import { NegotiationModule } from './modules/negotiation/negotiation.module';

@Module({
  imports: [FunnelModule, LeadModule, NegotiationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
