import { BotConfiguration, BotType, Prisma, PrismaClient } from "@prisma/client";
import { BotConfigInternal, IBotConfigurationRepository } from "./IBotConfigurationRepository";


export class BotConfigurationRepository implements IBotConfigurationRepository {
  constructor(private prisma: PrismaClient) {}

  async createBotConfiguration(botConfiguration: BotConfigInternal): Promise<BotConfiguration> {
    const { type, configuration } = botConfiguration;
    if (!this.validateConfiguration(type, configuration)) {
      throw new Error(`Invalid configuration for BotType: ${type}`);
    }
  
    // Create and save the configuration in the database
    const newConfiguration = await this.prisma.botConfiguration.create({
      data: {
        type,
        data: JSON.stringify(configuration),
      },
    });
  
    return newConfiguration;
  }

  getBotConfigurationById(id: string): Promise<BotConfiguration | null> {
    return this.prisma.botConfiguration.findUnique({ where: { id } });
  }

  updateBotConfiguration(id: string, botConfiguration: BotConfigInternal): Promise<BotConfiguration> {
    const { type, configuration } = botConfiguration;
    if (!this.validateConfiguration(type, configuration)) {
      throw new Error(`Invalid configuration for BotType: ${type}`);
    }

    return this.prisma.botConfiguration.update({ 
      where: { id }, 
      data: {
        type,
        data: JSON.stringify(configuration),
      }
    });
  }

  deleteBotConfiguration(id: string): Promise<BotConfiguration | null> {
    return this.prisma.botConfiguration.delete({ where: { id } });
  }

  private validateConfiguration(type: BotType, configuration: object): boolean {
    
    return true;
  }
}


