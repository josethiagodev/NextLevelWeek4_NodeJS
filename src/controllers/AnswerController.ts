import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {

  async execute(request: Request, response: Response) {
    // Recebendo 'parametros' que vem da rota
    const { value } = request.params;
    const { u } = request.query;

    // Buscando dentro do repositório
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // .findOne = Mostrar somente 1 'surveyUser'
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    // Se não existir 'usuário da pesquisa', retorna erro com 'status 400'
    if(!surveyUser) {
      throw new AppError("Survey user does not exists!");
    }
    // Sobrescrevendo o value + Parseando o 'String' para 'Númerico'
    surveyUser.value = Number(value);

    // Salvando dados
    await surveysUsersRepository.save(surveyUser);

    // Retornando resposta via 'JSON'
    return response.json(surveyUser);
  }

}

export { AnswerController };