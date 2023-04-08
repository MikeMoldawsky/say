import { Bot, BotType } from '@prisma/client';

export interface IBotRepository {
  createBot(bot: Bot, type: BotType, configuration: object): Promise<Bot>;
  getBotById(id: string): Promise<Bot | null>;
  updateBot(bot: Bot): Promise<Bot>;
  deleteBot(id: string): Promise<Bot | null>;
}