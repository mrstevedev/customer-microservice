/*
  Warnings:

  - You are about to drop the `AlternatePhone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AlternatePhone";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Phone2" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Phone2_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Phone2_userId_key" ON "Phone2"("userId");
