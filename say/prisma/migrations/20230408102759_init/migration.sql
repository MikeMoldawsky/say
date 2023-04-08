/*
  Warnings:

  - The values [STABLE_DIFFUSION_IMAGE] on the enum `BotType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Bot` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BotType_new" AS ENUM ('STABLE_DIFFUSION_TEXT_TO_IMAGE', 'OPENAI_CHAT_COMPLETION');
ALTER TABLE "BotConfiguration" ALTER COLUMN "type" TYPE "BotType_new" USING ("type"::text::"BotType_new");
ALTER TYPE "BotType" RENAME TO "BotType_old";
ALTER TYPE "BotType_new" RENAME TO "BotType";
DROP TYPE "BotType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Bot" DROP CONSTRAINT "Bot_userId_fkey";

-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pipeline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineBot" (
    "id" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "pipelineId" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "isOutputBot" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PipelineBot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pipeline_id_key" ON "Pipeline"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineBot_id_key" ON "PipelineBot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineBot_configurationId_key" ON "PipelineBot"("configurationId");

-- AddForeignKey
ALTER TABLE "Bot" ADD CONSTRAINT "Bot_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBot" ADD CONSTRAINT "PipelineBot_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBot" ADD CONSTRAINT "PipelineBot_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineBot" ADD CONSTRAINT "PipelineBot_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "BotConfiguration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
