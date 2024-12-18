/*
  Warnings:

  - You are about to drop the column `Velden` on the `Zaal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Zaal" DROP COLUMN "Velden",
ADD COLUMN     "velden" TEXT[];
