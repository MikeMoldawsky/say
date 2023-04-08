import { Bot, BotConfiguration, BotType } from "@prisma/client";
import { BotRepository } from "../repositories/bots/BotRepository";
import { CreateBot } from "../repositories/bots/IBotRepository";
import { BotConfigurationRepository } from "../repositories/configurations/BotConfigurationRepository";
import { BotConfigRequest, BotResult, ChatBotConfig, CreateBotRequest, ImageBotConfig, UpdateBotRequest } from "../../../objects-api/bots";
import { BotConfigInternal } from "../repositories/configurations/IBotConfigurationRepository";
import { OpenAIChatCompletionConfig } from "../repositories/configurations/openai/OpenAIChatCompletionConfig";

export class BotManager {
  constructor(private botRepository: BotRepository, private botConfigurationRepository: BotConfigurationRepository) {}

  async createBot(ownerId: string, createBotRequest: CreateBotRequest): Promise<Bot> {
    const createBotConfiguration: BotConfigInternal = this.getConfigOrThrow(createBotRequest.config);
    const config = await this.botConfigurationRepository.createBotConfiguration(createBotConfiguration);
    const createBot:  CreateBot = {
        name: createBotRequest.name,
        image: createBotRequest.imageUrl,
        description: createBotRequest.description,
        configurationId: config.id,
        ownerId,
      }
    return this.botRepository.createBot(createBot);
  }


  async createBots(ownerId: string, createBotRequests: CreateBotRequest[]): Promise<Bot[]> {
    let bots: Bot[] = [];
    for(let i = 0; i < createBotRequests.length; i++) {
        const bot = await this.createBot(ownerId, createBotRequests[i]);
        bots.push(bot);
    }
    return bots;
  }
  

  async getBotById(id: string): Promise<BotResult> {
    const bot = await this.botRepository.getBotById(id);
    const botConfig = await this.botConfigurationRepository.getBotConfigurationById(bot.configurationId);
    return this.toBotResult(bot, botConfig);
  }

  async getUserBots(userId: string): Promise<BotResult[]> {
	const bots: Bot[] = await this.botRepository.getUserBots(userId);
    const configs: BotConfiguration[] = await Promise.all(bots.map((bot) => this.botConfigurationRepository.getBotConfigurationById(bot.configurationId)));
    // iterate over both arrays and create a new array of BotResult
    const result: BotResult[] = [];
    for (let i = 0; i < bots.length; i++) {
        const bot = bots[i];
        const botConfig = configs[i];
        const botResult = this.toBotResult(bot, botConfig);
        result.push(botResult);
    }
    return result;
  }

  async updateBot(botId: string, botUpdate: UpdateBotRequest): Promise<void>{
    // TODO: I'm taking into account a complete update of the bot, not just the config
    if(botUpdate.config){
        const bot = await this.botRepository.getBotById(botId);
        const newConfig = this.getConfigOrThrow(botUpdate.config);
        await this.botConfigurationRepository.updateBotConfiguration(bot.configurationId, newConfig);
    }
    if(botUpdate.name || botUpdate.imageUrl || botUpdate.description){
        await this.botRepository.updateBot({
            id: botId,
            name: botUpdate.name,
            image: botUpdate.imageUrl,
            description: botUpdate.description,
        });
    }   
  }

  async deleteBot(botId: string): Promise<Bot | null> {
    const bot = await this.botRepository.getBotById(botId);
    if (!bot) {
      throw new Error("Bot not found");
    }
    try {
        return this.botRepository.deleteBot(botId);
    } catch(e){
        throw new Error(`Error deleting bot ${botId} ${e}`);
    }
    try{
        await this.botConfigurationRepository.deleteBotConfiguration(bot.configurationId);
    } catch(e){
        throw new Error(`Error deleting bot configuration ${bot.configurationId} ${e}`);
    }
  }

  private toBotResult(bot: Bot, botConfig: BotConfiguration): BotResult {
    let config;
    if(botConfig.type === BotType.OPENAI_CHAT_COMPLETION) {
        config = {
            type: 'chat',
            systemMessage: (JSON.parse(botConfig.data as string) as OpenAIChatCompletionConfig).messages[0].content,
        } as ChatBotConfig;
    } else if (botConfig.type === BotType.STABLE_DIFFUSION_TEXT_TO_IMAGE) {
        config = {
            type: 'image',
        } as ImageBotConfig
    } else {
        throw new Error("Invalid bot type");
    }

    return {
        _id: bot.id,
        name: bot.name,
        imageUrl: bot.image || '',
        description: bot.description || '',
        config
    };
  }

  private getConfigOrThrow(config: BotConfigRequest): BotConfigInternal {
    if(config.type === 'chat') {
        return {
            type: BotType.OPENAI_CHAT_COMPLETION,
            configuration: {
                model: "gpt-3.5-turbo",
                messages: [
                    {role: 'system', content: (config as ChatBotConfig).systemMessage}
                ]
            },
        };
    } else if(config.type === 'image') {
        return {
            type: BotType.STABLE_DIFFUSION_TEXT_TO_IMAGE,
            configuration: {
                prompts: [{text: "kuku"}]
            },
        };
    } else {
        throw new Error("Invalid bot type");
    }
  }
}
