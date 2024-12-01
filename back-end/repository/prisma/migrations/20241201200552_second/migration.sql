/*
  Warnings:

  - You are about to drop the column `coachCoachLicentie` on the `Ploeg` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ploeg" DROP CONSTRAINT "Ploeg_coachCoachLicentie_fkey";

-- AlterTable
ALTER TABLE "Ploeg" DROP COLUMN "coachCoachLicentie",
ADD COLUMN     "CoachLicentie" TEXT;

-- AddForeignKey
ALTER TABLE "Ploeg" ADD CONSTRAINT "Ploeg_CoachLicentie_fkey" FOREIGN KEY ("CoachLicentie") REFERENCES "Coach"("CoachLicentie") ON DELETE SET NULL ON UPDATE CASCADE;
