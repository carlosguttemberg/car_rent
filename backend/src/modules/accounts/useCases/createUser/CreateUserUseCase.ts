import { inject } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    driver_license,
    email,
    username,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      password,
      driver_license,
      email,
      username,
    });
  }
}

export { CreateUserUseCase };
