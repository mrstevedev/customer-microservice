/*
  Warnings:

  - You are about to drop the `Phone2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Phone2_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Phone2";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AlternatePhone" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AlternatePhone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OtherContactInfo" (
    "email" TEXT NOT NULL,
    "preferredContactMethod" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OtherContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OtherContactInfo" ("email", "preferredContactMethod", "preferredLanguage", "userId") SELECT "email", "preferredContactMethod", "preferredLanguage", "userId" FROM "OtherContactInfo";
DROP TABLE "OtherContactInfo";
ALTER TABLE "new_OtherContactInfo" RENAME TO "OtherContactInfo";
CREATE UNIQUE INDEX "OtherContactInfo_email_key" ON "OtherContactInfo"("email");
CREATE UNIQUE INDEX "OtherContactInfo_userId_key" ON "OtherContactInfo"("userId");
CREATE TABLE "new_Phone" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("areaCode", "lineNumber", "phoneType", "preFix", "userId") SELECT "areaCode", "lineNumber", "phoneType", "preFix", "userId" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AlternatePhone_userId_key" ON "AlternatePhone"("userId");
