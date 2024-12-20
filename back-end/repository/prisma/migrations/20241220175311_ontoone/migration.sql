/*
  Warnings:

  - A unique constraint covering the columns `[ploegnaam]` on the table `Coach` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coachLicentie]` on the table `Ploeg` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Coach" ADD COLUMN     "ploegnaam" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Coach_ploegnaam_key" ON "Coach"("ploegnaam");

-- CreateIndex
CREATE UNIQUE INDEX "Ploeg_coachLicentie_key" ON "Ploeg"("coachLicentie");
