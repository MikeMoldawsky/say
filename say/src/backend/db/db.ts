import { PrismaClient } from '@prisma/client';
import { UserRepository } from './repositories/users/UserRepository';
import { BotRepository } from './repositories/bots/BotRepository';
import { BotConfigurationRepository } from './repositories/configurations/BotConfigurationRepository';
import { UserManager } from './managers/UserManager';
import { BotManager } from './managers/BotManager';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const botRepository = new BotRepository(prisma);
const botConfigurationRepository = new BotConfigurationRepository(prisma);
const userManager = new UserManager(userRepository);
const botManager = new BotManager(botRepository, botConfigurationRepository);

export { prisma, userManager, botManager };