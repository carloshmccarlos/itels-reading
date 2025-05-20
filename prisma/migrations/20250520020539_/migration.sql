/*
  Warnings:

  - You are about to drop the column `readedTimes` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "readedTimes",
ADD COLUMN     "readTimes" INTEGER NOT NULL DEFAULT 0;
