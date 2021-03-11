import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
  async create(request: Request, response: Response) {
    // Enviando requisição através do 'body'
    const { title, description } = request.body;

    // Pegando/buscando um repositório específico
    const surveysRepository = getCustomRepository(SurveysRepository);

    // Criando 'title, description' no repositório
    const survey = surveysRepository.create({
      title, description
    })

    // Salvando 'title, description' no repositório
    await surveysRepository.save(survey);

    // Retornando uma resposta de status através do JSON
    return response.status(201).json(survey);
  }

  // Listar e mostrar todas as pesquisas
  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);
    
    // .Find = método para listar todos os registro de uma tabela
    const all = await surveysRepository.find();

    // Retornando resposta atraves do JSON
    return response.json(all); 
  }
}

export { SurveysController };