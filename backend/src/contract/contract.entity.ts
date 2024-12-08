import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({name: 'contract'})
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  expiresAt: Date;

  @Column()
  lastTerminationDate: Date;
}

@Entity({ name: 'contract_notification' })
export class ContractNotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contractId: number;

  @ManyToOne(() => ContractEntity)
  @JoinColumn({ name: 'contractId' })
  contract: ContractEntity;

  @Column()
  type: '4_weeks' | '2_weeks' | '1_day';

  @Column()
  sentAt: Date;
}