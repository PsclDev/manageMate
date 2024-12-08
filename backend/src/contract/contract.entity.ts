import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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