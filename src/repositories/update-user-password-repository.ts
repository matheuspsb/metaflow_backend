import { User } from 'generated/prisma/client';

export abstract class UpdateUserPasswordRepository {
  abstract updatePassword(id: string, hashedPassword: string): Promise<User>;
}
