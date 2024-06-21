-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeSheet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registeredDay" INTEGER NOT NULL,
    "registeredMonth" INTEGER NOT NULL,
    "registeredYear" INTEGER NOT NULL,
    "first_entrance" INTEGER,
    "first_exit" INTEGER,
    "second_entrance" INTEGER,
    "second_exit" INTEGER,
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
