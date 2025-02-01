import { Module } from '@nestjs/common';
import { FunnelService } from './funnel.service';
import { FunnelController } from './funnel.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FunnelController],
  providers: [FunnelService],
  exports: [FunnelService],
})
export class FunnelModule {}
