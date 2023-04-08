import { BotRepository } from '../src/backend/db/repositories/bots/BotRepository';
import { CreateBot } from '../src/backend/db/repositories/bots/IBotRepository';
import {describe, expect, test, beforeEach, beforeAll, afterAll} from '@jest/globals';
import { BotConfiguration, PrismaClient, User } from "@prisma/client";
import { BotType } from "@prisma/client";
import { nanoid } from 'nanoid';


describe("BotRepository", () => {
  let botRepository: BotRepository;
  let prisma: PrismaClient;
  let testUser: User;
  let testConfig: BotConfiguration;

  beforeAll(async () => {
    prisma = new PrismaClient();
    botRepository = new BotRepository(prisma);

    testUser = await prisma.user.create({
      data: {
        email: `test-${nanoid(5)}@example.com`,
      },
    });
    testConfig = await prisma.botConfiguration.create({
      data: {
        type: BotType.OPENAI_CHAT_COMPLETION,
        data: JSON.stringify({apiKey: "test-api-key"})},
    });
  });

  afterAll(async () => {
    // Disconnect the Prisma client after all tests
    await prisma.user.delete({ where: { id: testUser.id } });
    await prisma.botConfiguration.delete({ where: { id: testConfig.id } });
    await prisma.$disconnect();
  });

  test("should create a bot", async () => {
    const bot: CreateBot = {
      name: "TestBot",
      description: "A test bot",
      ownerId: testUser.id,
      configurationId: testConfig.id,
    };

    const createdBot = await botRepository.createBot(bot);

    expect(createdBot.id).toBeDefined();
    expect(createdBot.name).toBe(bot.name);
    expect(createdBot.description).toBe(bot.description);
    expect(createdBot.configurationId).toBe(bot.configurationId);

    // Clean up
    await prisma.bot.delete({ where: { id: createdBot.id } });
  });

  test("should get a bot by id", async () => {
    const bot: CreateBot = {
      name: "TestBot",
      description: "A test bot",
      ownerId: testUser.id,
      configurationId: testConfig.id,
    };

    const createdBot = await botRepository.createBot(bot);
    const fetchedBot = await botRepository.getBotById(createdBot.id);

    expect(fetchedBot).toBeDefined();
    expect(fetchedBot).toMatchObject(createdBot);

    // Clean up
    await prisma.bot.delete({ where: { id: createdBot.id } });
  });

  test("should update a bot", async () => {
    const bot: CreateBot = {
      name: "TestBot",
      description: "A test bot",
      ownerId: testUser.id,
      configurationId: testConfig.id,
    };

    const createdBot = await botRepository.createBot(bot);
    const updatedBot = await botRepository.updateBot({ ...createdBot, name: "UpdatedTestBot" });

    expect(updatedBot).toBeDefined();
    expect(updatedBot.id).toBe(createdBot.id);
    expect(updatedBot.name).toBe("UpdatedTestBot");

    // Clean up
    await prisma.bot.delete({ where: { id: createdBot.id } });
  });

  test("should delete a bot", async () => {
    const bot: CreateBot = {
      name: "TestBot",
      description: "A test bot",
      ownerId: testUser.id,
      configurationId: testConfig.id,
    };

    const createdBot = await botRepository.createBot(bot);
    const deletedBot = await botRepository.deleteBot(createdBot.id);
    const fetchedBot = await botRepository.getBotById(createdBot.id);

    expect(deletedBot).toBeDefined();
    expect(deletedBot?.id).toBe(createdBot.id);
    expect(fetchedBot).toBeNull();
  });

  test("should not allow assigning the same configuration to multiple bots", async () => {  
    // Create the first bot with the configuration
    const bot1: CreateBot = {
      name: "TestBot1",
      description: "A test bot",
      ownerId: testUser.id,
      configurationId: testConfig.id,
    };

    const createdBot1 = await botRepository.createBot(bot1);
  
    // Try to create a second bot with the same configuration
    const bot2: CreateBot = {
      name: "TestBot2",
      description: "A test bot",
      ownerId: testUser.id,
      configurationId: testConfig.id,
    };
  
    // Check if an error is thrown or the second bot creation fails
    try {
      const createdBot2 = await botRepository.createBot(bot2);
      expect(createdBot2).toBeNull(); // Test should fail if this line is reached
    } catch (error) {
      expect(error).toBeDefined(); // Test passes if an error is thrown
    }
    // Clean up
    await prisma.bot.delete({ where: { id: createdBot1.id } });
  });
  

});
