/*
  Warnings:

  - Added the required column `isNewCode` to the `ExecuteDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExecuteDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isNewCode" BOOLEAN NOT NULL,
    "errors" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "time" DECIMAL NOT NULL,
    "executionId" INTEGER NOT NULL,
    CONSTRAINT "ExecuteDetails_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "Execution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExecuteDetails" ("createdAt", "errors", "executionId", "id", "result", "time", "updatedAt") SELECT "createdAt", "errors", "executionId", "id", "result", "time", "updatedAt" FROM "ExecuteDetails";
DROP TABLE "ExecuteDetails";
ALTER TABLE "new_ExecuteDetails" RENAME TO "ExecuteDetails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
