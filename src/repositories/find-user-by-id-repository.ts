import { User } from 'generated/prisma/client';

export abstract class FindUserByIdRepository {
  abstract findById(id: string): Promise<User | null>;
}
