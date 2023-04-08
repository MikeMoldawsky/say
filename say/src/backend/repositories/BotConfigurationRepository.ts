import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { BotConfiguration, BotType, Prisma, PrismaClient } from "@prisma/client";
import { IBotConfigurationRepository } from "./IBotConfigurationRepository";


export class BotConfigurationRepository implements IBotConfigurationRepository {
  constructor(private prisma: PrismaClient) {}

  async createBotConfiguration(type: BotType, configuration: object): Promise<BotConfiguration> {
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

  updateBotConfiguration(configuration: BotConfiguration): Promise<BotConfiguration> {
    return this.prisma.botConfiguration.update({ 
      where: { id: configuration.id }, 
      data: {
        type: configuration.type,
        data: configuration.data as Prisma.InputJsonValue,
      }
    });
  }

  deleteBotConfiguration(id: string): Promise<BotConfiguration | null> {
    return this.prisma.botConfiguration.delete({ where: { id } });
  }

  private validateConfiguration(type: BotType, configuration: object): boolean {
    // let config: OpenAiChatCompletionConfig;

    // if (type === BotType.OPENAI_CHAT_COMPLETION) {
    //   config = plainToClass(OpenAiChatCompletionConfig, configuration);
    // } else {
    //   throw new Error(`Unsupported BotType: ${type}`);
    // }

    // const errors = validate(config);
    // if (errors.length > 0) {
    //   throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    // }

    // return config;
    return true;
  }
}


