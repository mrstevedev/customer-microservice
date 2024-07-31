/*
  Warnings:

  - You are about to drop the `AlternatePhone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "AlternatePhone_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AlternatePhone";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phone" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("areaCode", "lineNumber", "phoneType", "preFix", "userId") SELECT "areaCode", "lineNumber", "phoneType", "preFix", "userId" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
