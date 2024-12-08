import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ContractEntity, ContractNotificationEntity } from './contract.entity';
import { addDays } from 'date-fns';
import { ConfigService } from '../config';

@Injectable()
export class ContractNotificationService {
  private readonly logger = new Logger(ContractNotificationService.name);

  constructor(
    private configService: ConfigService,
    @InjectRepository(ContractEntity)
    private contractRepository: Repository<ContractEntity>,
    @InjectRepository(ContractNotificationEntity)
    private notificationRepository: Repository<ContractNotificationEntity>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
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

      let notificationType: '4_weeks' | '2_weeks' | '1_day' | null = null;

      switch (daysUntilTermination) {
        case 28:
          notificationType = '4_weeks';
          break;
        case 14:
          notificationType = '2_weeks';
          break;
        case 1:
          notificationType = '1_day';
          break;
      }

      if (notificationType) {
        // Check if we've already sent this type of notification for this contract
        const existingNotification = await this.notificationRepository.findOne({
          where: {
            contractId: contract.id,
            type: notificationType,
          },
        });

        if (!existingNotification) {
          // Send notification and save record
          await this.sendDiscordWebhook(contract, daysUntilTermination);
          
          // Save notification record
          await this.notificationRepository.save({
            contractId: contract.id,
            type: notificationType,
            sentAt: new Date(),
          });

          this.logger.log(
            `Sent ${notificationType} notification for contract "${contract.title}" (ID: ${contract.id})`,
          );
        }
      }
    }
  }

  async sendDiscordWebhook(
    contract: ContractEntity,
    daysUntilTermination: number,
  ) {
    if (!this.configService.discordWebhookUrl) {
      return;
    }

    await fetch(this.configService.discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: contract.title,
            color: 16027614,
            description: contract.description,
            fields: [
              {
                name: 'Last Termination',
                value: `${contract.lastTerminationDate.toLocaleDateString()} (${daysUntilTermination} days left)`,
                inline: true,
              },
              {
                name: 'Expires At',
                value: contract.expiresAt.toLocaleDateString(),
                inline: true,
              },
            ],
          },
        ],
      }),
    });
  }
}
