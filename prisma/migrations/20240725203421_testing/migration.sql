/*
  Warnings:

  - You are about to drop the column `email` on the `OtherContactInfo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OtherContactInfo" (
    "preferredContactMethod" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OtherContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OtherContactInfo" ("preferredContactMethod", "userId") SELECT "preferredContactMethod", "userId" FROM "OtherContactInfo";
DROP TABLE "OtherContactInfo";
ALTER TABLE "new_OtherContactInfo" RENAME TO "OtherContactInfo";
CREATE UNIQUE INDEX "OtherContactInfo_userId_key" ON "OtherContactInfo"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
