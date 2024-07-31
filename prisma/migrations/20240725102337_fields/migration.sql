-- CreateTable
CREATE TABLE "Phone" (
    "areaCode" TEXT NOT NULL,
    "preFix" TEXT NOT NULL,
    "lineNumber" TEXT NOT NULL,
    "phoneType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OtherContactInfo" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");
