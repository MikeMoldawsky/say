import { User } from "@prisma/client";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<User | null>;
}

