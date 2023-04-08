import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  createUser(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateUser(user: User): Promise<User> {
    return this.prisma.user.update({ where: { id: user.id }, data: user });
  }

  deleteUser(id: string): Promise<User | null> {
    return this.prisma.user.delete({ where: { id } });
  }
}