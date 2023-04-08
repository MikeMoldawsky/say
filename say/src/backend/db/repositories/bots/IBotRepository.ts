import { Bot, BotType } from '@prisma/client';
import { BotConfigInternal } from '../configurations/IBotConfigurationRepository';

export interface CreateBot {
  name: string
  image?: string;
  description?: string;
  ownerId: string
  configurationId: string
}

export interface UpdateBot {
  id: string;
  name?: string;
  image?: string;
  description?: string;
}

export interface IBotRepository {
  createBot(bot: CreateBot): Promise<Bot>;
  getBotById(id: string): Promise<Bot>;
  updateBot(bot: UpdateBot): Promise<Bot>;
  deleteBot(id: string): Promise<Bot | null>;
  getUserBots(ownerId: string): Promise<Bot[]>;
}