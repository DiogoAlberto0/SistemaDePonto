-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "office" TEXT NOT NULL,
    "privillegeLevel" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    CONSTRAINT "User_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TimeSheet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registeredDay" INTEGER NOT NULL,
    "registeredMonth" INTEGER NOT NULL,
    "registeredYear" INTEGER NOT NULL,
    "first_entrance" INTEGER NOT NULL,
    "first_exit" INTEGER NOT NULL,
    "second_entrance" INTEGER NOT NULL,
    "second_exit" INTEGER NOT NULL,
    "missed" BOOLEAN NOT NULL DEFAULT false,
    "medicalCertificate" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TimeSheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Position_office_key" ON "Position"("office");

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_key" ON "Station"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Station_cnpj_key" ON "Station"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
