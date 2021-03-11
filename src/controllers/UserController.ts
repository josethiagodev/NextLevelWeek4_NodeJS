import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

import * as yup from 'yup';
import { AppError } from "../errors/AppError";

class UserController {
  async create(request: Request, response: Response) {
    // Enviando requisição através do 'body'
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    // Validação do YUP: Se o 'schema' não for válido
    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch(err) {
      throw new AppError(err);
    }
    
    // Criando e buscando repositório dos 'usuários'
    // Acessando métodos disponíveis dentro do 'TypeORM'
    const usersRepository = getCustomRepository(UsersRepository);

    // Não permitir que 'usuário' seja salvo com o mesmo 'email' duas vezes
    // .findOne: Trazendo somente um registro 
    const userAlreadyExists = await usersRepository.findOne({
      email
    });
    // Verificar se 'usuário' já existe (retornar a resposta pelo status 400 através do JSON)
    if(userAlreadyExists) {
      throw new AppError("User already exists!");
    }
    
    // Criando objeto de 'user' através do método 'create'
    const user = usersRepository.create({
      name, email
    });

    // Salvando dados no repositorio pelo objeto 'user'
    // Retorna uma promise de 'user'
    await usersRepository.save(user);

    // Retornando resposta através do 'JSON'
    return response.status(201).json(user);
  }
}


export { UserController };
