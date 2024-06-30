/*
  Warnings:

  - You are about to alter the column `first_entrance` on the `TimeSheet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `first_exit` on the `TimeSheet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `second_entrance` on the `TimeSheet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `second_exit` on the `TimeSheet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeSheet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registeredDay" INTEGER NOT NULL,
    "registeredMonth" INTEGER NOT NULL,
    "registeredYear" INTEGER NOT NULL,
    "first_entrance" BIGINT,
    "first_exit" BIGINT,
    "second_entrance" BIGINT,
    "second_exit" BIGINT,
    "missed" BOOLEAN NOT NULL DEFAULT false,
    "medicalCertificate" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TimeSheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimeSheet" ("first_entrance", "first_exit", "id", "medicalCertificate", "missed", "registeredDay", "registeredMonth", "registeredYear", "second_entrance", "second_exit", "userId") SELECT "first_entrance", "first_exit", "id", "medicalCertificate", "missed", "registeredDay", "registeredMonth", "registeredYear", "second_entrance", "second_exit", "userId" FROM "TimeSheet";
DROP TABLE "TimeSheet";
ALTER TABLE "new_TimeSheet" RENAME TO "TimeSheet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
