/*
  Warnings:

  - You are about to drop the column `status` on the `ExecutionResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Execution" ALTER COLUMN "errors" DROP NOT NULL,
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ExecutionResult" DROP COLUMN "status";

-- DropEnum
DROP TYPE "Status";
