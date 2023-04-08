import { PrismaClient, BotConfiguration, User, Bot, Pipeline, BotType } from "@prisma/client";
import {describe, expect, test, beforeEach, beforeAll, afterAll} from '@jest/globals';
import { PipelineBotRepository } from "../src/backend/db/repositories/pipelines/PipelineBotRepository";
import { nanoid } from 'nanoid';
import { CreatePipelineBot } from "../src/backend/db/repositories/pipelines/IPipelineBotRepository";

describe("PipelineBotRepository", () => {
  let pipelineBotRepository: PipelineBotRepository;
  let prisma: PrismaClient;
  let testUser: User;
  let testConfig: BotConfiguration;
  let testBot: Bot;
  let testPipeline: Pipeline;

  beforeAll(async () => {
    prisma = new PrismaClient();
    pipelineBotRepository = new PipelineBotRepository(prisma);

    testUser = await prisma.user.create({
      data: {
        email: `test-${nanoid(5)}@example.com`,
      },
    });

    testConfig = await prisma.botConfiguration.create({
      data: {
        type: BotType.OPENAI_CHAT_COMPLETION,
        data: JSON.stringify({apiKey: "test-api-key"}),
      },
    });

    testBot = await prisma.bot.create({
      data: {
        name: "TestBot",
        description: "A test bot",
        configurationId: testConfig.id,
        ownerId: testUser.id,
      },
    });

    testPipeline = await prisma.pipeline.create({
      data: {
        name: "TestPipeline",
        ownerId: testUser.id,
      },
    });
  });

  afterAll(async () => {
    // Disconnect the Prisma client after all tests
    await prisma.user.delete({ where: { id: testUser.id } });
    await prisma.botConfiguration.delete({ where: { id: testConfig.id } });
    await prisma.bot.delete({ where: { id: testBot.id } });
    await prisma.pipeline.delete({ where: { id: testPipeline.id } });
    await prisma.$disconnect();
  });

  test("should create a pipeline bot", async () => {
    const pipelineBot: CreatePipelineBot = {
      botId: testBot.id,
      pipelineId: testPipeline.id,
      configurationId: testConfig.id,
      isOutputBot: false,
    };
    const createdPipelineBot = await pipelineBotRepository.createPipelineBot(pipelineBot);

    expect(createdPipelineBot.id).toBeDefined();
    expect(createdPipelineBot.botId).toBe(pipelineBot.botId);
    expect(createdPipelineBot.pipelineId).toBe(pipelineBot.pipelineId);
    expect(createdPipelineBot.configurationId).toBe(pipelineBot.configurationId);
    expect(createdPipelineBot.isOutputBot).toBe(pipelineBot.isOutputBot);

    // Clean up
    await prisma.pipelineBot.delete({ where: { id: createdPipelineBot.id } });
  });

  test("should get a pipeline bot by id", async () => {
    const pipelineBot: CreatePipelineBot = {
      botId: testBot.id,
      pipelineId: testPipeline.id,
      configurationId: testConfig.id,
      isOutputBot: false,
    };

    const createdPipelineBot = await pipelineBotRepository.createPipelineBot(pipelineBot);
    const fetchedPipelineBot = await pipelineBotRepository.getPipelineBotById(createdPipelineBot.id);

    expect(fetchedPipelineBot).toBeDefined();
    expect(fetchedPipelineBot).toMatchObject(createdPipelineBot);

    // Clean up
    await prisma.pipelineBot.delete({ where: { id: createdPipelineBot.id } });
  });

  test("should update a pipeline bot", async () => {
    const pipelineBot: CreatePipelineBot = {
      botId: testBot.id,
      pipelineId: testPipeline.id,
      configurationId: testConfig.id,
      isOutputBot: false,
    };
    const createdPipelineBot = await pipelineBotRepository.createPipelineBot(pipelineBot);
    const updatedPipelineBot = await pipelineBotRepository.updatePipelineBot({ ...createdPipelineBot, isOutputBot: true });

    expect(updatedPipelineBot).toBeDefined();
    expect(updatedPipelineBot.id).toBe(createdPipelineBot.id);
    expect(updatedPipelineBot.isOutputBot).toBe(true);
    
    // Clean up
    await prisma.pipelineBot.delete({ where: { id: createdPipelineBot.id } });
  });

  test("should delete a pipeline bot", async () => {
    const pipelineBot: CreatePipelineBot = {
      botId: testBot.id,
      pipelineId: testPipeline.id,
      configurationId: testConfig.id,
      isOutputBot: false,
    };
    const createdPipelineBot = await pipelineBotRepository.createPipelineBot(pipelineBot);
    const deletedPipelineBot = await pipelineBotRepository.deletePipelineBot(createdPipelineBot.id);
    const fetchedPipelineBot = await pipelineBotRepository.getPipelineBotById(createdPipelineBot.id);

    expect(deletedPipelineBot).toBeDefined();
    expect(deletedPipelineBot?.id).toBe(createdPipelineBot.id);
    expect(fetchedPipelineBot).toBeNull();
  });
});

