/*
  Warnings:

  - You are about to drop the `AlternatePhone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Phone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `preferredLanguage` on the `OtherContactInfo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AlternatePhone_userId_key";

-- DropIndex
DROP INDEX "Phone_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AlternatePhone";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Phone";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OtherContactInfo" (
    "email" TEXT NOT NULL,
    "preferredContactMethod" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OtherContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OtherContactInfo" ("email", "preferredContactMethod", "userId") SELECT "email", "preferredContactMethod", "userId" FROM "OtherContactInfo";
DROP TABLE "OtherContactInfo";
ALTER TABLE "new_OtherContactInfo" RENAME TO "OtherContactInfo";
CREATE UNIQUE INDEX "OtherContactInfo_email_key" ON "OtherContactInfo"("email");
CREATE UNIQUE INDEX "OtherContactInfo_userId_key" ON "OtherContactInfo"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
