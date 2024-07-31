/*
  Warnings:

  - You are about to drop the column `areaCode` on the `AlternatePhone` table. All the data in the column will be lost.
  - You are about to drop the column `lineNumber` on the `AlternatePhone` table. All the data in the column will be lost.
  - You are about to drop the column `phoneType` on the `AlternatePhone` table. All the data in the column will be lost.
  - You are about to drop the column `prefix` on the `AlternatePhone` table. All the data in the column will be lost.
  - Added the required column `areaCode2` to the `AlternatePhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineNumber2` to the `AlternatePhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneType2` to the `AlternatePhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix2` to the `AlternatePhone` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AlternatePhone" (
    "areaCode2" TEXT NOT NULL,
    "prefix2" TEXT NOT NULL,
    "lineNumber2" TEXT NOT NULL,
    "phoneType2" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AlternatePhone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AlternatePhone" ("userId") SELECT "userId" FROM "AlternatePhone";
DROP TABLE "AlternatePhone";
ALTER TABLE "new_AlternatePhone" RENAME TO "AlternatePhone";
CREATE UNIQUE INDEX "AlternatePhone_userId_key" ON "AlternatePhone"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
