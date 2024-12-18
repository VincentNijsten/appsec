-- DropForeignKey
ALTER TABLE "TrainingSession" DROP CONSTRAINT "TrainingSession_ploegNaam_fkey";

-- CreateTable
CREATE TABLE "_PloegToTrainingSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PloegToTrainingSession_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PloegToTrainingSession_B_index" ON "_PloegToTrainingSession"("B");

-- AddForeignKey
ALTER TABLE "_PloegToTrainingSession" ADD CONSTRAINT "_PloegToTrainingSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Ploeg"("ploegnaam") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PloegToTrainingSession" ADD CONSTRAINT "_PloegToTrainingSession_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
