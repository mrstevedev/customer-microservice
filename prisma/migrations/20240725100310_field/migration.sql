/*
  Warnings:

  - You are about to drop the `AlternatePhone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AlternatePhone";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Alternate" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Alternate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Alternate_userId_key" ON "Alternate"("userId");
