import { Pipeline } from '@prisma/client';

export type CreatePipeline = {
  name: string;
  description?: string;
  ownerId: string;
}

export interface IPipelineRepository {
  createPipeline(createPipeline: CreatePipeline): Promise<Pipeline>;
  getPipelineById(id: string): Promise<Pipeline | null>;
  updatePipeline(pipeline: Pipeline): Promise<Pipeline>;
  deletePipeline(id: string): Promise<Pipeline | null>;
}