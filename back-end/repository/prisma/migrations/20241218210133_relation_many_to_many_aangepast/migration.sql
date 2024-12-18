/*
  Warnings:

  - You are about to drop the `_PloegToTrainingSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PloegToTrainingSession" DROP CONSTRAINT "_PloegToTrainingSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_PloegToTrainingSession" DROP CONSTRAINT "_PloegToTrainingSession_B_fkey";

-- DropTable
DROP TABLE "_PloegToTrainingSession";

-- CreateTable
CREATE TABLE "_TrainingSessionPloegen" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TrainingSessionPloegen_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TrainingSessionPloegen_B_index" ON "_TrainingSessionPloegen"("B");

-- AddForeignKey
ALTER TABLE "_TrainingSessionPloegen" ADD CONSTRAINT "_TrainingSessionPloegen_A_fkey" FOREIGN KEY ("A") REFERENCES "Ploeg"("ploegnaam") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingSessionPloegen" ADD CONSTRAINT "_TrainingSessionPloegen_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
