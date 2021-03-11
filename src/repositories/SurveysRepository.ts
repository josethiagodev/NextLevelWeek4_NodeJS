import { Repository, EntityRepository } from "typeorm";
import { Survey } from "../models/Survey";

// Cada entidade tem um repósitório específico
// Definindo que 'SurveysRepository' vai ser um repositório e passando a entidade de 'Survey'
@EntityRepository(Survey)
// extends: permite acessar os métodos pelo 'SurveysRepository'
// A entidade de 'Survey' passa classes p/ 'Repository' pelo TypeORM
class SurveysRepository extends Repository<Survey> {
  
}

export { SurveysRepository };