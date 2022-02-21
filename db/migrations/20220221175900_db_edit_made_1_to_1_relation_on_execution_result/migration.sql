/*
  Warnings:

  - A unique constraint covering the columns `[executionResultId]` on the table `Execution` will be added. If there are existing duplicate values, this will fail.
  - Made the column `executionResultId` on table `Execution` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Execution" DROP CONSTRAINT "Execution_executionResultId_fkey";

-- AlterTable
ALTER TABLE "Execution" ALTER COLUMN "executionResultId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Execution_executionResultId_key" ON "Execution"("executionResultId");

-- AddForeignKey
ALTER TABLE "Execution" ADD CONSTRAINT "Execution_executionResultId_fkey" FOREIGN KEY ("executionResultId") REFERENCES "ExecutionResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
