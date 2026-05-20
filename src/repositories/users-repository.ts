import { User } from 'generated/prisma/client';

export abstract class UsersRepository {
  abstract create(name: string, email: string, password: string): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract fetchAll(): Promise<User[]>;
  abstract delete(id: string): Promise<User>;
  abstract updatePassword(id: string, hashedPassword: string): Promise<User>;
}
