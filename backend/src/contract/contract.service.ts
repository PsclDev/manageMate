import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractEntity } from './contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private contractRepository: Repository<ContractEntity>,
  ) {}

  async findAll(): Promise<ContractEntity[]> {
    return this.contractRepository.find();
  }

  async findOne(id: number): Promise<ContractEntity> {
    const contract = await this.contractRepository.findOne({ where: { id } });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return contract;
  }

  async create(contractData: Partial<ContractEntity>): Promise<ContractEntity> {
    const contract = this.contractRepository.create(contractData);
    return this.contractRepository.save(contract);
  }

  async update(id: number, contractData: Partial<ContractEntity>): Promise<ContractEntity> {
    await this.findOne(id); // Verify contract exists
    await this.contractRepository.update(id, contractData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.contractRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
  }
}
