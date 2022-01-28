/*
  Warnings:

  - You are about to drop the `ExecutionResult` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `flagValue` to the `Execution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Execution` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExecutionResult";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ExecuteDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "errors" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "time" DECIMAL NOT NULL,
    "executionId" INTEGER NOT NULL,
    CONSTRAINT "ExecuteDetails_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "Execution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Execution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "flagValue" BOOLEAN NOT NULL,
    "key" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Execution_key_fkey" FOREIGN KEY ("key") REFERENCES "Feature" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Execution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Execution" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "Execution";
DROP TABLE "Execution";
ALTER TABLE "new_Execution" RENAME TO "Execution";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
