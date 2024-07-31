-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OtherContactInfo" (
    "email" TEXT NOT NULL,
    "preferredContactMethod" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OtherContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Phone" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OtherContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Phone2" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
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
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Phone" ("areaCode", "lineNumber", "phoneType", "preFix", "userId") SELECT "areaCode", "lineNumber", "phoneType", "preFix", "userId" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");
CREATE TABLE "new_Phone2" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Phone2" ("areaCode", "lineNumber", "phoneType", "preFix", "userId") SELECT "areaCode", "lineNumber", "phoneType", "preFix", "userId" FROM "Phone2";
DROP TABLE "Phone2";
ALTER TABLE "new_Phone2" RENAME TO "Phone2";
CREATE UNIQUE INDEX "Phone2_userId_key" ON "Phone2"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
