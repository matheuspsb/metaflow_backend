import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma/client';
import { UsersRepository } from 'src/repositories/users-repository';
import { CreateNewUserBody } from 'src/dtos/create-new-user-body';
import { UpdateUserPasswordBody } from 'src/dtos/update-user-password-body';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(body: CreateNewUserBody): Promise<User> {
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      return await this.usersRepository.create(name, email, hashedPassword);
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

  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async fetchAllUsers(): Promise<User[]> {
    return this.usersRepository.fetchAll();
  }

  async deleteUser(id: string): Promise<User> {
    try {
      return await this.usersRepository.delete(id);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async updatePassword(
    id: string,
    body: UpdateUserPasswordBody,
  ): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(
      body.currentPassword,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);

    return this.usersRepository.updatePassword(id, hashedPassword);
  }
}
