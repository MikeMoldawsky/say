import { PrismaClient, Pipeline } from "@prisma/client";
import { IPipelineRepository } from "./IPipelineRepository";
import { PipelineBotRepository } from "./PipelineBotRepository";
import { IPipelineBotRepository } from "./IPipelineBotRepository";

export class PipelineRepository implements IPipelineRepository {
  private pipelineBotRepository: IPipelineBotRepository;

  constructor(private prisma: PrismaClient) {
    this.pipelineBotRepository = new PipelineBotRepository(prisma);
  }

  async createPipeline(pipeline: Pipeline, ownerId: string): Promise<Pipeline> {
    return this.prisma.pipeline.create({
      data: {
        ...pipeline,
        ownerId,
      },
    });
  }

  getPipelineById(id: string): Promise<Pipeline | null> {
    return this.prisma.pipeline.findUnique({ where: { id } });
  }

  updatePipeline(pipeline: Pipeline): Promise<Pipeline> {
    return this.prisma.pipeline.update({ where: { id: pipeline.id }, data: pipeline });
  }

  deletePipeline(id: string): Promise<Pipeline | null> {
    return this.prisma.pipeline.delete({ where: { id } });
  }
}
