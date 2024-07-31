/*
  Warnings:

  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `assistanceWithInsurance` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `county` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyPlanning` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fixedAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Contact" (
    "preferredContactMethod" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Phone" (
    "areaCode" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Contact" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "fixedAddress" BOOLEAN NOT NULL,
    "assistanceWithInsurance" BOOLEAN NOT NULL,
    "familyPlanning" BOOLEAN NOT NULL
);
INSERT INTO "new_Customer" ("firstName", "id", "lastName") SELECT "firstName", "id", "lastName" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_key" ON "Contact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");
