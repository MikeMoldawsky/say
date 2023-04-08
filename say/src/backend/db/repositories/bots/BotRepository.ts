import { Bot, PrismaClient } from "@prisma/client";
import { CreateBot, IBotRepository, UpdateBot } from "./IBotRepository";

export class BotRepository implements IBotRepository {

  constructor(private prisma: PrismaClient) {}

  async createBot(createBot: CreateBot): Promise<Bot> {
    console.log("Creating bot", createBot);
    return this.prisma.bot.create({
      data: {
        ...createBot,
        configurationId: createBot.configurationId,
      },
    });
  }

  async getBotById(id: string): Promise<Bot> {
    const bot = await this.prisma.bot.findUnique({ where: { id } });
    if (!bot) {
      throw new Error(`Bot with id ${id} not found`);
    }
    return bot;
  }

  updateBot(bot: UpdateBot): Promise<Bot> {
    console.log("Updating bot", bot);
    return this.prisma.bot.update({ where: { id: bot.id }, data: bot });
  }

  deleteBot(id: string): Promise<Bot | null> {
    return this.prisma.bot.delete({ where: { id } });
  }

  getUserBots(ownerId: string): Promise<Bot[]> {
    return this.prisma.bot.findMany({ where: { ownerId } }) || [];
  }
}