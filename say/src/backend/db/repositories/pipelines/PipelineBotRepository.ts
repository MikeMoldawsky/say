import { PrismaClient, PipelineBot } from "@prisma/client";
import { CreatePipelineBot, IPipelineBotRepository } from "./IPipelineBotRepository";

export class PipelineBotRepository implements IPipelineBotRepository {  
  constructor(private prisma: PrismaClient) {}

  async createPipelineBot(createPipelineBot: CreatePipelineBot): Promise<PipelineBot> {
    return this.prisma.pipelineBot.create({
      data: {
        ...createPipelineBot,
        botId: createPipelineBot.botId,
        pipelineId: createPipelineBot.pipelineId,
        isOutputBot: createPipelineBot.isOutputBot,
        configurationId: createPipelineBot.configurationId,
      },
    });
  }

  getPipelineBotById(id: string): Promise<PipelineBot | null> {
    return this.prisma.pipelineBot.findUnique({ where: { id } });
  }

  updatePipelineBot(pipelineBot: PipelineBot): Promise<PipelineBot> {
    return this.prisma.pipelineBot.update({ where: { id: pipelineBot.id }, data: pipelineBot });
  }

  deletePipelineBot(id: string): Promise<PipelineBot | null> {
    return this.prisma.pipelineBot.delete({ where: { id } });
  }
}
