/*
  Warnings:

  - You are about to drop the column `areaCode2` on the `AlternatePhone` table. All the data in the column will be lost.
  - You are about to drop the column `lineNumber2` on the `AlternatePhone` table. All the data in the column will be lost.
  - You are about to drop the column `phoneType2` on the `AlternatePhone` table. All the data in the column will be lost.
  - You are about to drop the column `prefix2` on the `AlternatePhone` table. All the data in the column will be lost.
  - You are about to drop the column `prefix` on the `Phone` table. All the data in the column will be lost.
  - Added the required column `areaCode` to the `AlternatePhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineNumber` to the `AlternatePhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneType` to the `AlternatePhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preFix` to the `AlternatePhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preFix` to the `Phone` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AlternatePhone" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AlternatePhone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AlternatePhone" ("userId") SELECT "userId" FROM "AlternatePhone";
DROP TABLE "AlternatePhone";
ALTER TABLE "new_AlternatePhone" RENAME TO "AlternatePhone";
CREATE UNIQUE INDEX "AlternatePhone_userId_key" ON "AlternatePhone"("userId");
CREATE TABLE "new_Phone" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("areaCode", "lineNumber", "phoneType", "userId") SELECT "areaCode", "lineNumber", "phoneType", "userId" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
