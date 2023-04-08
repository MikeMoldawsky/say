import { PrismaClient, Pipeline } from "@prisma/client";
import { CreatePipeline, IPipelineRepository } from "./IPipelineRepository";

export class PipelineRepository implements IPipelineRepository {

  constructor(private prisma: PrismaClient) {}

  async createPipeline(createPipeline: CreatePipeline): Promise<Pipeline> {
    return this.prisma.pipeline.create({
      data: {
        ...createPipeline,
        ownerId: createPipeline.ownerId,
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
