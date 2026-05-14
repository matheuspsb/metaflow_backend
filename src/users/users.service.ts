import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma/client';
import { CreateUserRepository } from 'src/repositories/create-user-repository';
import { CreateNewUserBody } from 'src/dtos/create-new-user-body';

@Injectable()
export class UsersService {
  constructor(private createUserRepository: CreateUserRepository) {}

  async createUser(body: CreateNewUserBody): Promise<User> {
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      return await this.createUserRepository.createUser(
        name,
        email,
        hashedPassword,
      );
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }
}
