import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";
import { AppError } from "../errors/AppError";

class SendMailController {

  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // 01 - Verificando se o 'usuário' existe no 'Repositório de Usuários'
    // .findOne = método que retorna 1 usuário ou o primeiro da lista
    const user = await usersRepository.findOne({ email })

    // Se o 'usuário' não existir, retornar erro de 'status 400' via JSON
    if (!user) {
      throw new AppError("User does not exists!");
    }

    // 02 - Verificando se a 'pesquisa' existe no 'Repositório de Pesquisas'
    // .findOne = método que retorna 1 usuário ou o primeiro da lista
    const survey = await surveysRepository.findOne({
      id: survey_id
    });

    // Se a 'pesquisa' não existir, retornar erro de 'status 400' via JSON
    if (!survey) {
      throw new AppError("Survey does not exists!");
    }

    // Utilizando 'resolve' do módulo 'path'
    // Localizando o caminho que está o arquivo 'npsMail.hbs'
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    // Se já existir uma 'pesquisa de usuário', mostrar somente a primeira
    // .findOne = método que retorna 1 usuário ou o primeiro da lista
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value : null },
      relations: ["user", "survey"],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    }

    if(surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    // 03 - Criando informações na tabela/repositório 'surveyUser'
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    // e salvando informações na tabela/repositório 'surveysUsersRepository'
    await surveysUsersRepository.save(surveyUser);
    variables.id = surveyUser.id;

    // Chamando o 'servico de email'
    await SendMailService.execute(email, survey.title, variables, npsPath);

    // Retornando resposta via JSON
    return response.json(surveyUser);
  }

}

export { SendMailController };