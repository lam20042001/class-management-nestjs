import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1734935659187 implements MigrationInterface {
    name = ' $npmConfigName1734935659187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_97d7c4427a252e27738a32a3959" FOREIGN KEY ("classid") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_97d7c4427a252e27738a32a3959"`);
    }

}
