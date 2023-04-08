import { PrismaClient, Pipeline, User } from "@prisma/client";
import {describe, expect, test, beforeEach, beforeAll, afterAll} from '@jest/globals';
import { PipelineRepository } from "../src/backend/repositories/pipelines/PipelineRepository";
import { nanoid } from "nanoid";
import { CreatePipeline } from "../src/backend/repositories/pipelines/IPipelineRepository";

describe("PipelineRepository", () => {
  let pipelineRepository: PipelineRepository;
  let prisma: PrismaClient;
  let testUser: User;

  beforeAll(async () => {
    prisma = new PrismaClient();
    pipelineRepository = new PipelineRepository(prisma);

    testUser = await prisma.user.create({
      data: {
        email: `test-${nanoid(5)}@example.com`,
      },
    });
  });

  afterAll(async () => {
    // Disconnect the Prisma client after all tests
    await prisma.user.delete({ where: { id: testUser.id } });
    await prisma.$disconnect();
  });

  test("should create a pipeline", async () => {
    const pipeline: CreatePipeline = {
      name: "TestPipeline",
      ownerId: testUser.id,
    };

    const createdPipeline = await pipelineRepository.createPipeline(pipeline);

    expect(createdPipeline.id).toBeDefined();
    expect(createdPipeline.name).toBe(pipeline.name);
    expect(createdPipeline.ownerId).toBe(pipeline.ownerId);

    // Clean up
    await prisma.pipeline.delete({ where: { id: createdPipeline.id } });
  });

  test("should get a pipeline by id", async () => {
    const pipeline: CreatePipeline = {
      name: "TestPipeline",
      ownerId: testUser.id,
    };

    const createdPipeline = await pipelineRepository.createPipeline(pipeline);
    const fetchedPipeline = await pipelineRepository.getPipelineById(createdPipeline.id);

    expect(fetchedPipeline).toBeDefined();
    expect(fetchedPipeline).toMatchObject(createdPipeline);

    // Clean up
    await prisma.pipeline.delete({ where: { id: createdPipeline.id } });
  });

  test("should update a pipeline", async () => {
    const pipeline: CreatePipeline = {
      name: "TestPipeline",
      ownerId: testUser.id,
    };

    const createdPipeline = await pipelineRepository.createPipeline(pipeline);
    const updatedPipeline = await pipelineRepository.updatePipeline({ ...createdPipeline, name: "UpdatedTestPipeline" });

    expect(updatedPipeline).toBeDefined();
    expect(updatedPipeline.id).toBe(createdPipeline.id);
    expect(updatedPipeline.name).toBe("UpdatedTestPipeline");

    // Clean up
    await prisma.pipeline.delete({ where: { id: createdPipeline.id } });
  });

  test("should delete a pipeline", async () => {
    const pipeline: CreatePipeline = {
      name: "TestPipeline",
      ownerId: testUser.id,
    };

    const createdPipeline = await pipelineRepository.createPipeline(pipeline);
    const deletedPipeline = await pipelineRepository.deletePipeline(createdPipeline.id);
    const fetchedPipeline = await pipelineRepository.getPipelineById(createdPipeline.id);

    expect(deletedPipeline).toBeDefined();
    expect(deletedPipeline?.id).toBe(createdPipeline.id);
    expect(fetchedPipeline).toBeNull();
  });
});