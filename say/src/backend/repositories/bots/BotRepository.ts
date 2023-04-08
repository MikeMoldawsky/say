import { Bot, PrismaClient } from "@prisma/client";
import { CreateBot, IBotRepository } from "./IBotRepository";

export class BotRepository implements IBotRepository {

  constructor(private prisma: PrismaClient) {}

  async createBot(createBot: CreateBot): Promise<Bot> {
    return this.prisma.bot.create({
      data: {
        ...createBot,
        configurationId: createBot.configurationId,
      },
    });
  }

  getBotById(id: string): Promise<Bot | null> {
    return this.prisma.bot.findUnique({ where: { id } });
  }

  updateBot(bot: Bot): Promise<Bot> {
    return this.prisma.bot.update({ where: { id: bot.id }, data: bot });
  }

  deleteBot(id: string): Promise<Bot | null> {
    return this.prisma.bot.delete({ where: { id } });
  }
}