import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from '../database';

describe("Users", () => {

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

  // Rodando o teste para criar um novo 'usuário'
  it("Shoul be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "user example",
    });

    // Espero que a resposta da requisição seja com 'status 201'
    expect(response.status).toBe(201);
  });

  // Rodando o teste para verificar se o 'usuário' existe
  it("Shoul be able to create a user with exists email", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "user example",
    });

    // Espero que a resposta da requisição seja com 'status 400'
    expect(response.status).toBe(400);
  });

});