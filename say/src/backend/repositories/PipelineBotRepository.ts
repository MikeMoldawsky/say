import { PrismaClient, PipelineBot } from "@prisma/client";
import { IPipelineBotRepository } from "./IPipelineBotRepository";
import { IBotConfigurationRepository } from "./IBotConfigurationRepository";
import { BotConfigurationRepository } from "./BotConfigurationRepository";
import { IBotRepository } from "./IBotRepository";
import { BotRepository } from "./BotRepository";

export class PipelineBotRepository implements IPipelineBotRepository {
  private botConfigurationRepository: IBotConfigurationRepository;
  private botRepository: IBotRepository;
  
  constructor(private prisma: PrismaClient) {
    this.botConfigurationRepository = new BotConfigurationRepository(prisma);
    this.botRepository = new BotRepository(prisma);
  }

  async createPipelineBot(pipelineBot: PipelineBot, botConfiguration: object): Promise<PipelineBot> {
    // TODO: add validation on top of the config
    // Fetch the associated bot using the bot repository
    const bot = await this.botRepository.getBotById(pipelineBot.botId);
    if (!bot) {
      throw new Error(`Bot not found with ID: ${pipelineBot.botId}`);
    }
    const config = await this.botConfigurationRepository.getBotConfigurationById(bot.configurationId);
    if (!config) {
      throw new Error(`Config not found with ID: ${bot.configurationId}`);
    }
    const newBotConfiguration = await this.botConfigurationRepository.createBotConfiguration(
      config.type,
      botConfiguration
    );

    return this.prisma.pipelineBot.create({
      data: {
        ...pipelineBot,
        configurationId: newBotConfiguration.id,
      },
    });
  }

  getPipelineBotById(id: string): Promise<PipelineBot | null> {
    return this.prisma.pipelineBot.findUnique({ where: { id } });
  }

  updatePipelineBot(pipelineBot: PipelineBot): Promise<PipelineBot> {
    return this.prisma.pipelineBot.update({ where: { id: pipelineBot.id }, data: pipelineBot });
  }

  deletePipelineBot(id: string): Promise<PipelineBot | null> {
    return this.prisma.pipelineBot.delete({ where: { id } });
  }
}
