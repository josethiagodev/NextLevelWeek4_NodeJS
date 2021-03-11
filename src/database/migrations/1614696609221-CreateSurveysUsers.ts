import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614696609221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "survey_id",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true, // O campo da coluna vai seu nulo inicialmente
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
								foreignKeys: [
									{
										name: "FKUser",
										referencedTableName: "users", // Mapeando e referenciando o 'user'
										referencedColumnNames: ["id"], // Referencia o 'id" dentro da tabela de 'users'
										columnNames: ["user_id"], // Referenciando o nome de 'user_id'
										onDelete: "CASCADE", // 
										onUpdate: "CASCADE", //
									},
									{
										name: "FKSurvey",
										referencedTableName: "surveys", // Mapeando e referenciando o 'user'
										referencedColumnNames: ["id"], // Referencia o 'id" dentro da tabela de 'users'
										columnNames: ["survey_id"], // Referenciando o nome de 'user_id'
										onDelete: "CASCADE", // 
										onUpdate: "CASCADE", //
									},
								]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropTable("surveys_users");
    }

}
