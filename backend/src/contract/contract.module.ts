import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity, ContractNotificationEntity } from './contract.entity';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { ContractNotificationService } from './contract-notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity, ContractNotificationEntity])],
  controllers: [ContractController],
  providers: [ContractService, ContractNotificationService],
})
export class ContractModule {}
