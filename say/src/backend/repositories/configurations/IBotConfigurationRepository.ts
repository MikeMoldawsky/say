import { BotConfiguration, BotType } from '@prisma/client';
import { StableDiffusionTextToImageConfig } from './stable-diffusion/StableDiffusionTextToImageConfig';
import { OpenAIChatCompletionConfig } from './openai/OpenAIChatCompletionConfig';

export interface IBotConfigurationRepository {
  createBotConfiguration(config: BotConfigInternal): Promise<BotConfiguration>;
  getBotConfigurationById(id: string): Promise<BotConfiguration | null>;
  updateBotConfiguration(id: string, config: BotConfigInternal): Promise<BotConfiguration>;
  deleteBotConfiguration(id: string): Promise<BotConfiguration | null>;
}

export interface BotConfigInternal {
  type: BotType;
  configuration: OpenAIChatCompletionConfig | StableDiffusionTextToImageConfig;
}