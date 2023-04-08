import { PrismaClient, Bot, BotConfiguration, User, BotType } from "@prisma/client";
import { UserRepository } from "../repositories/users/UserRepository";
import { UserResult } from "@/objects-api/users";

export class UserManager {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: string): Promise<UserResult> {
    const user = await this.userRepository.getUserById(id)
    return {
      _id: user.id,
      email: user.email,
    };
  }
}
