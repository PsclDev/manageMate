import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractEntity } from './contract.entity';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  findAll(): Promise<ContractEntity[]> {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ContractEntity> {
    return this.contractService.findOne(id);
  }

  @Post()
  create(@Body() createContractDto: CreateContractDto): Promise<ContractEntity> {
    return this.contractService.create(createContractDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    return this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.contractService.remove(id);
  }
}
