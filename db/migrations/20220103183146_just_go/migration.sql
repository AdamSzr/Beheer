/*
  Warnings:

  - You are about to drop the column `key` on the `Execution` table. All the data in the column will be lost.
  - Added the required column `flagKey` to the `Execution` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Execution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "flagValue" BOOLEAN NOT NULL,
    "flagKey" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Execution_flagKey_fkey" FOREIGN KEY ("flagKey") REFERENCES "Feature" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Execution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Execution" ("createdAt", "flagValue", "id", "updatedAt", "userId") SELECT "createdAt", "flagValue", "id", "updatedAt", "userId" FROM "Execution";
DROP TABLE "Execution";
ALTER TABLE "new_Execution" RENAME TO "Execution";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
