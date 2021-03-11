import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614357986120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          // Nome da tabela
          name: "users",
          // Identificação/Quantidade de colunas
          columns: [
              {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
              },
              {
                name: "name",
                type: "varchar",
              },
              {
                name: "email",
                type: "varchar",
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              }
        ]

        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
