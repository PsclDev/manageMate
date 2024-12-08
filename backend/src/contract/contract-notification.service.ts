import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ContractEntity } from './contract.entity';
import { addDays } from 'date-fns';

@Injectable()
export class ContractNotificationService {
  private readonly logger = new Logger(ContractNotificationService.name);

  constructor(
    @InjectRepository(ContractEntity)
    private contractRepository: Repository<ContractEntity>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async checkContractTerminations() {
    this.logger.log('Checking contract terminations...');
    const today = new Date();
    const futureDate = addDays(today, 28); // 4 weeks ahead

    const contracts = await this.contractRepository.find({
      where: {
        lastTerminationDate: Between(today, futureDate),
      },
    });
    this.logger.log(
      `Found ${contracts.length} contracts that will reach their termination date in the next 4 weeks`,
    );

    for (const contract of contracts) {
      const daysUntilTermination = Math.floor(
        (contract.lastTerminationDate.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      console.log(daysUntilTermination);

      switch (daysUntilTermination) {
        case 28: // 4 weeks
          this.logger.log(
            `Contract "${contract.title}" (ID: ${contract.id}) will reach its termination date in 4 weeks`,
          );
          break;
        case 14: // 2 weeks
          this.logger.log(
            `Contract "${contract.title}" (ID: ${contract.id}) will reach its termination date in 2 weeks`,
          );
          break;
        case 1: // 1 day
          this.logger.log(
            `Contract "${contract.title}" (ID: ${contract.id}) will reach its termination date tomorrow`,
          );
          break;
      }
    }
  }

  // Method to manually trigger notifications check (for testing)
  async testNotifications() {
    await this.checkContractTerminations();
  }
}
