-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "remuneration" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "offerTypeId" TEXT NOT NULL,
    "beginAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "age_min" INTEGER NOT NULL,
    "age_max" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "interAccepted" BOOLEAN NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offer_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offer_offerTypeId_fkey" FOREIGN KEY ("offerTypeId") REFERENCES "OfferType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("age_max", "age_min", "beginAt", "city", "contractId", "country", "createdAt", "description", "endAt", "id", "image", "interAccepted", "offerTypeId", "organizationId", "postal_code", "remuneration", "title", "userId") SELECT "age_max", "age_min", "beginAt", "city", "contractId", "country", "createdAt", "description", "endAt", "id", "image", "interAccepted", "offerTypeId", "organizationId", "postal_code", "remuneration", "title", "userId" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
