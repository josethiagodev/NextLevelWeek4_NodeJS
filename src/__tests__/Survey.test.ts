import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from '../database';

describe("Surveys", () => {

  // Rodando as migrations antes de tudo
  beforeAll(async () => {
    // Instância da conexão
    const connection = await createConnection();
    // Executando as 'migratons'
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  // 01 - Rodando o teste para criar uma nova 'pesquisa'
  it("Shoul be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Title Example",
      description: "Description Example",
    });

    // Esperamos que a resposta da requisição seja com 'status 201'
    expect(response.status).toBe(201);

    // Esperamos que a resposta venha com a propriedade 'id' '
    expect(response.body).toHaveProperty("id");
  });

  // 02 - Rodando o teste para buscar todas as 'pesquisas'
  it("Shoul be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Title Example",
      description: "Description Example2",
    });

    // Instanciando e requisitando uma resposta das 'pesquisas' através do 'get' 
    const response = await request(app).get("/surveys");

    // Esperamos que o tamanho do array se igual à 2
    expect(response.body.length).toBe(2);
  });

});