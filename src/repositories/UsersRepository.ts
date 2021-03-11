import { Repository, EntityRepository } from "typeorm";
import { User } from "../models/User";

// Cada entidade tem um repósitório específico
// Definindo que 'UsersRepository' vai ser um repositório e passando a entidade de 'User'
@EntityRepository(User)
// extends: permite acessar os métodos pelo 'UsersRepository'
// A entidade de 'User' passa classes p/ 'Repository' pelo TypeORM
class UsersRepository extends Repository<User> {}

export { UsersRepository };