import { User } from 'generated/prisma/client';

export abstract class CreateUserRepository {
  abstract createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User>;
}
