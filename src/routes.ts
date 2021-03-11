import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveysController } from './controllers/SurveysController';
import { SendMailController } from './controllers/SendMailController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

const router = Router();

// Chamando os controllers de 'User' e 'Surveys'
const userController = new UserController();
const surveysController = new SurveysController();

// Chamando o controller de 'Enviar email'
const sendMailController = new SendMailController();

// Chamando o controller de 'Resposta'
const answerController = new AnswerController();

// Chamando o controller de 'Cálculo do NPS'
const npsController = new NpsController();


// Rota de criar 'usuários' através do 'post'
// Chamando a function 'userController'
router.post('/users', userController.create);

// Rota de criar 'pesquisas' através do 'post'
// Chamando a function 'surveysController'
router.post('/surveys', surveysController.create);

// Rota de listar/mostrar todas 'pesquisas' através do 'get'
// Chamando a function 'surveysController'
router.get('/surveys', surveysController.show);

// Rota de criar/salvar 'email' através do 'execute'
// Chamando a function 'sendMailController'
router.post('/sendMail', sendMailController.execute);

// Rota de buscar todas 'respostas' através do 'get'
// Chamando a function 'answerController'
router.get('/answers/:value', answerController.execute);

// Rota de buscar todas 'respostas' através do 'get'
// Chamando a function 'npsController'
router.get('/nps/:survey_id', npsController.execute);


export { router };