import { User } from "@prisma/client";

export type CreateUser = Omit<User, "id">;

export interface IUserRepository {
  createUser(user: CreateUser): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<User | null>;
}

