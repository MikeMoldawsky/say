import { PrismaClient, User } from "@prisma/client";
import { CreateUser, IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  createUser(user: CreateUser): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  updateUser(user: User): Promise<User> {
    return this.prisma.user.update({ where: { id: user.id }, data: user });
  }

  deleteUser(id: string): Promise<User | null> {
    return this.prisma.user.delete({ where: { id } });
  }
}