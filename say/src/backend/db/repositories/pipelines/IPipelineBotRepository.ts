import { PipelineBot } from "@prisma/client";

export type CreatePipelineBot = {
  botId: string
  pipelineId: string
  configurationId: string
  isOutputBot: boolean
}

export interface IPipelineBotRepository {
  createPipelineBot(pipelineBot: PipelineBot): Promise<PipelineBot>;
  getPipelineBotById(id: string): Promise<PipelineBot | null>;
  updatePipelineBot(pipelineBot: PipelineBot): Promise<PipelineBot>;
  deletePipelineBot(id: string): Promise<PipelineBot | null>;
}
