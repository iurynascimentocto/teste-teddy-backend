import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSelectedClientsTable1742347261824
  implements MigrationInterface
{
  name = 'CreateSelectedClientsTable1742347261824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "selected_clients" ("id" SERIAL NOT NULL, "clientId" integer NOT NULL, CONSTRAINT "UQ_4524bf2e08939af213b7ab855df" UNIQUE ("clientId"), CONSTRAINT "PK_e2ee15457cda12cc30845f1d708" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "selected_clients"`);
  }
}
