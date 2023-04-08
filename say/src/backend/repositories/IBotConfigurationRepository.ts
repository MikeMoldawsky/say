import { BotConfiguration, BotType } from '@prisma/client';

export interface IBotConfigurationRepository {
  createBotConfiguration(type: BotType, configuration: object): Promise<BotConfiguration>;
  getBotConfigurationById(id: string): Promise<BotConfiguration | null>;
  updateBotConfiguration(configuration: BotConfiguration): Promise<BotConfiguration>;
  deleteBotConfiguration(id: string): Promise<BotConfiguration | null>;
}
