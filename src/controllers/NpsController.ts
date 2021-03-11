import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

/**
  Notas: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  Detratores = notas de 0 à 6
  Passivos = notas 7 e 8
  Promotores = notas 9 e 10
  CAUCULO NPS: total promotores - total detratores / total respondentes X 100
**/

class NpsController {
  async execute(request: Request, response: Response) {
    // Recebendo 'parametros' que vem da rota
    const { survey_id } = request.params;

    // Buscando dentro do repositório
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // Método find = retorna o valor do primeiro elemento do array
    const surveysUsers = await surveysUsersRepository.find({
      survey_id, 
      value: Not(IsNull()),
    });

    // Filtrando os detratores
    // Método .filter = cria um novo array com todos os elementos
    const detractor = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    // Filtrando os promotores
    // Método .filter = cria um novo array com todos os elementos
    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    // Filtrando os passivos
    // Método .filter = cria um novo array com todos os elementos
    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    // Calculando o total de respondentes (total de respostas)
    const totalAnswers = surveysUsers.length;

    // Calculando o resultado
    const calculate = Number(
      (((promoters - detractor)  / totalAnswers) * 100).toFixed(2)
    );
    
    // Retornando resposta via JSON
    return response.json({
      detractor, 
      promoters, 
      passive, 
      totalAnswers, 
      nps: calculate,
    });
  }
}

export { NpsController };