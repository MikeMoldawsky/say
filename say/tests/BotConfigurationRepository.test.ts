import {describe, expect, test, beforeEach, beforeAll, afterAll} from '@jest/globals';
import { PrismaClient, BotType } from '@prisma/client';
import { BotConfigurationRepository } from "../src/backend/repositories/configurations/BotConfigurationRepository";
import { StableDiffusionTextToImageBotConfig } from '@/backend/repositories/configurations/stable-diffusion/StableDiffusionTextToImageConfig';
import { OpenAIChatCompletionBotConfig } from '@/backend/repositories/configurations/openai/OpenAiChatCompletionConfig';

describe("BotConfigurationRepository", () => {
  let prisma: PrismaClient;
  let repository: BotConfigurationRepository;

  beforeAll(() => {
    prisma = new PrismaClient();
    repository = new BotConfigurationRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("should succesfully create a OPENAI_CHAT_COMPLETION bot configuration", async () => {
    const createConfig: OpenAIChatCompletionBotConfig = {
      type: BotType.OPENAI_CHAT_COMPLETION,
      configuration: {
        model: "gpt-3.5-turbo",
        messages: [
          {role: "system", content: "test-api-key"}
        ],
      },
    };
    const actualBotConfig = await repository.createBotConfiguration(createConfig);

    expect(actualBotConfig.id).toBeDefined();
    expect(actualBotConfig.type).toBe(createConfig.type);
    expect(JSON.parse(actualBotConfig.data as string)).toMatchObject(createConfig.configuration as any);

    await prisma.botConfiguration.delete({ where: { id: actualBotConfig.id } });
  });

  test("should succesfully create a STABLE_DIFFUSION_TEXT_TO_IMAGE bot configuration", async () => {
    const createConfig: StableDiffusionTextToImageBotConfig = {
      type: BotType.STABLE_DIFFUSION_TEXT_TO_IMAGE,
      configuration: {prompts:[{text:"This is my prompt"}]},
    };
    const actualBotConfig = await repository.createBotConfiguration(createConfig);

    expect(actualBotConfig.id).toBeDefined();
    expect(actualBotConfig.type).toBe(createConfig.type);
    expect(JSON.parse(actualBotConfig.data as string)).toMatchObject(createConfig.configuration as any);

    await prisma.botConfiguration.delete({ where: { id: actualBotConfig.id } });
  });


  test("should get a bot configuration by id", async () => {
    // Setup: create a bot configuration
    const configuration = {
      apiKey: "test-api-key",
    };

    const createdConfiguration = await prisma.botConfiguration.create({
      data: {
        type: BotType.OPENAI_CHAT_COMPLETION,
        data: JSON.stringify(configuration),
      },
    });

    // Exercise
    const fetchedConfiguration = await repository.getBotConfigurationById(createdConfiguration.id);

    // Verify
    expect(fetchedConfiguration).toMatchObject(createdConfiguration);

    // Cleanup
    await prisma.botConfiguration.delete({ where: { id: createdConfiguration.id } });
  });

  // Add tests for updateBotConfiguration and deleteBotConfiguration following a similar structure
});

