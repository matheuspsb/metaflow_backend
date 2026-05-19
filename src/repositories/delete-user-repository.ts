import { User } from 'generated/prisma/client';

export abstract class DeleteUserRepository {
  abstract deleteUser(id: string): Promise<User>;
}
