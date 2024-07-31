/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Contact_userId_key";

-- DropIndex
DROP INDEX "Contact_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contact";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OtherContactInfo" (
    "email" TEXT NOT NULL,
    "preferredContactMethod" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OtherContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phone" (
    "areaCode" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("areaCode", "lineNumber", "phoneType", "prefix", "userId") SELECT "areaCode", "lineNumber", "phoneType", "prefix", "userId" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "OtherContactInfo_email_key" ON "OtherContactInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OtherContactInfo_userId_key" ON "OtherContactInfo"("userId");
