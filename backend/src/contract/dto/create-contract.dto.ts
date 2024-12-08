import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateContractDto {
  @IsString()
  @MaxLength(32)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  description?: string;

  @IsDateString()
  expiresAt: Date;

  @IsDateString()
  lastTerminationDate: Date;
}
