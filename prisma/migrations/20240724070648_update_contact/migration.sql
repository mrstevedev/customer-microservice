/*
  Warnings:

  - Added the required column `preferredLanguage` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "preferredContactMethod" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("email", "preferredContactMethod", "userId") SELECT "email", "preferredContactMethod", "userId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");
CREATE UNIQUE INDEX "Contact_userId_key" ON "Contact"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
