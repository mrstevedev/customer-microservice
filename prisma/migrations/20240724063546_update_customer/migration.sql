/*
  Warnings:

  - You are about to drop the column `familyPlanning` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `familyPlanningBenefits` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
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
    "familyPlanningBenefits" BOOLEAN NOT NULL
);
INSERT INTO "new_Customer" ("assistanceWithInsurance", "county", "dateOfBirth", "firstName", "fixedAddress", "gender", "id", "lastName", "middleName") SELECT "assistanceWithInsurance", "county", "dateOfBirth", "firstName", "fixedAddress", "gender", "id", "lastName", "middleName" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
