import { User } from 'generated/prisma/client';

export abstract class FetchAllUsersRepository {
  abstract fetchAll(): Promise<User[]>;
}
