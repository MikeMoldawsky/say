import { Bot, BotType, PrismaClient } from "@prisma/client";
import { IBotRepository } from "./IBotRepository";
import { BotConfigurationRepository } from "./BotConfigurationRepository";
import { IBotConfigurationRepository } from "./IBotConfigurationRepository";

export class BotRepository implements IBotRepository {
  private configurationRepository: IBotConfigurationRepository;

  constructor(private prisma: PrismaClient) {
    this.configurationRepository = new BotConfigurationRepository(prisma);
  }

  async createBot(bot: Bot, type: BotType, configuration: object): Promise<Bot> {
    const botConfiguration = await this.configurationRepository.createBotConfiguration(type, configuration);

    return this.prisma.bot.create({
      data: {
        ...bot,
        configurationId: botConfiguration.id,
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