import { PipelineBot } from "@prisma/client";

export interface IPipelineBotRepository {
  createPipelineBot(pipelineBot: PipelineBot, botConfiguration: object): Promise<PipelineBot>;
  getPipelineBotById(id: string): Promise<PipelineBot | null>;
  updatePipelineBot(pipelineBot: PipelineBot): Promise<PipelineBot>;
  deletePipelineBot(id: string): Promise<PipelineBot | null>;
}
