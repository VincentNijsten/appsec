-- CreateTable
CREATE TABLE "Speler" (
    "SpelerLicentie" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "leeftijd" INTEGER NOT NULL,
    "ploegPloegnaam" TEXT,

    CONSTRAINT "Speler_pkey" PRIMARY KEY ("SpelerLicentie")
);

-- CreateTable
CREATE TABLE "Coach" (
    "CoachLicentie" TEXT NOT NULL,
    "naam" TEXT NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("CoachLicentie")
);

-- CreateTable
CREATE TABLE "Ploeg" (
    "Ploegnaam" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,
    "coachCoachLicentie" TEXT,

    CONSTRAINT "Ploeg_pkey" PRIMARY KEY ("Ploegnaam")
);

-- CreateTable
CREATE TABLE "TrainingSession" (
    "id" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "startTijd" TEXT NOT NULL,
    "eindTijd" TEXT NOT NULL,
    "ploegPloegnaam" TEXT NOT NULL,
    "zaalNaam" TEXT NOT NULL,

    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zaal" (
    "naam" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "beschikbaarheid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Zaal_pkey" PRIMARY KEY ("naam")
);

-- CreateIndex
CREATE UNIQUE INDEX "Speler_SpelerLicentie_key" ON "Speler"("SpelerLicentie");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_CoachLicentie_key" ON "Coach"("CoachLicentie");

-- CreateIndex
CREATE UNIQUE INDEX "Ploeg_Ploegnaam_key" ON "Ploeg"("Ploegnaam");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSession_id_key" ON "TrainingSession"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Zaal_naam_key" ON "Zaal"("naam");

-- AddForeignKey
ALTER TABLE "Speler" ADD CONSTRAINT "Speler_ploegPloegnaam_fkey" FOREIGN KEY ("ploegPloegnaam") REFERENCES "Ploeg"("Ploegnaam") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ploeg" ADD CONSTRAINT "Ploeg_coachCoachLicentie_fkey" FOREIGN KEY ("coachCoachLicentie") REFERENCES "Coach"("CoachLicentie") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_ploegPloegnaam_fkey" FOREIGN KEY ("ploegPloegnaam") REFERENCES "Ploeg"("Ploegnaam") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_zaalNaam_fkey" FOREIGN KEY ("zaalNaam") REFERENCES "Zaal"("naam") ON DELETE RESTRICT ON UPDATE CASCADE;
