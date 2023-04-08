import { Bot, BotType } from '@prisma/client';
import { BotConfigInternal } from '../configurations/IBotConfigurationRepository';

export interface CreateBot {
  name: string
  image?: string;
  description?: string;
  ownerId: string
  configurationId: string
}

export interface IBotRepository {
  createBot(bot: CreateBot): Promise<Bot>;
  getBotById(id: string): Promise<Bot | null>;
  updateBot(bot: Bot): Promise<Bot>;
  deleteBot(id: string): Promise<Bot | null>;
}