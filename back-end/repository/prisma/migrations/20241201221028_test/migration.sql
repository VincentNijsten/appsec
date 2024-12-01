/*
  Warnings:

  - The primary key for the `Coach` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CoachLicentie` on the `Coach` table. All the data in the column will be lost.
  - The primary key for the `Ploeg` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CoachLicentie` on the `Ploeg` table. All the data in the column will be lost.
  - You are about to drop the column `Ploegnaam` on the `Ploeg` table. All the data in the column will be lost.
  - The primary key for the `Speler` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SpelerLicentie` on the `Speler` table. All the data in the column will be lost.
  - You are about to drop the column `ploegPloegnaam` on the `Speler` table. All the data in the column will be lost.
  - You are about to drop the column `ploegPloegnaam` on the `TrainingSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coachLicentie]` on the table `Coach` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ploegnaam]` on the table `Ploeg` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spelerLicentie]` on the table `Speler` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coachLicentie` to the `Coach` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ploegnaam` to the `Ploeg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spelerLicentie` to the `Speler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ploegNaam` to the `TrainingSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ploeg" DROP CONSTRAINT "Ploeg_CoachLicentie_fkey";

-- DropForeignKey
ALTER TABLE "Speler" DROP CONSTRAINT "Speler_ploegPloegnaam_fkey";

-- DropForeignKey
ALTER TABLE "TrainingSession" DROP CONSTRAINT "TrainingSession_ploegPloegnaam_fkey";

-- DropIndex
DROP INDEX "Coach_CoachLicentie_key";

-- DropIndex
DROP INDEX "Ploeg_Ploegnaam_key";

-- DropIndex
DROP INDEX "Speler_SpelerLicentie_key";

-- AlterTable
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_pkey",
DROP COLUMN "CoachLicentie",
ADD COLUMN     "coachLicentie" TEXT NOT NULL,
ADD CONSTRAINT "Coach_pkey" PRIMARY KEY ("coachLicentie");

-- AlterTable
ALTER TABLE "Ploeg" DROP CONSTRAINT "Ploeg_pkey",
DROP COLUMN "CoachLicentie",
DROP COLUMN "Ploegnaam",
ADD COLUMN     "coachLicentie" TEXT,
ADD COLUMN     "ploegnaam" TEXT NOT NULL,
ADD CONSTRAINT "Ploeg_pkey" PRIMARY KEY ("ploegnaam");

-- AlterTable
ALTER TABLE "Speler" DROP CONSTRAINT "Speler_pkey",
DROP COLUMN "SpelerLicentie",
DROP COLUMN "ploegPloegnaam",
ADD COLUMN     "ploegNaam" TEXT,
ADD COLUMN     "spelerLicentie" TEXT NOT NULL,
ADD CONSTRAINT "Speler_pkey" PRIMARY KEY ("spelerLicentie");

-- AlterTable
ALTER TABLE "TrainingSession" DROP COLUMN "ploegPloegnaam",
ADD COLUMN     "ploegNaam" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coach_coachLicentie_key" ON "Coach"("coachLicentie");

-- CreateIndex
CREATE UNIQUE INDEX "Ploeg_ploegnaam_key" ON "Ploeg"("ploegnaam");

-- CreateIndex
CREATE UNIQUE INDEX "Speler_spelerLicentie_key" ON "Speler"("spelerLicentie");

-- AddForeignKey
ALTER TABLE "Speler" ADD CONSTRAINT "Speler_ploegNaam_fkey" FOREIGN KEY ("ploegNaam") REFERENCES "Ploeg"("ploegnaam") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ploeg" ADD CONSTRAINT "Ploeg_coachLicentie_fkey" FOREIGN KEY ("coachLicentie") REFERENCES "Coach"("coachLicentie") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_ploegNaam_fkey" FOREIGN KEY ("ploegNaam") REFERENCES "Ploeg"("ploegnaam") ON DELETE RESTRICT ON UPDATE CASCADE;
