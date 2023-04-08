import { Pipeline } from '@prisma/client';

export interface IPipelineRepository {
  createPipeline(pipeline: Pipeline, ownerId: string): Promise<Pipeline>;
  getPipelineById(id: string): Promise<Pipeline | null>;
  updatePipeline(pipeline: Pipeline): Promise<Pipeline>;
  deletePipeline(id: string): Promise<Pipeline | null>;
}