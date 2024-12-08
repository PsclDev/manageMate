import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContractTable1733663695352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contract',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'expiresAt',
            type: 'timestamp',
          },
          {
            name: 'lastTerminationDate',
            type: 'timestamp',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'contract_notification',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'contractId',
            type: 'int',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'sentAt',
            type: 'timestamp',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contract');
  }
}
