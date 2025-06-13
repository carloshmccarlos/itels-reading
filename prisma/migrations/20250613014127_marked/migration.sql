/*
  Warnings:

  - You are about to drop the `Novel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Novel" DROP CONSTRAINT "Novel_seriesName_fkey";

-- DropTable
DROP TABLE "Novel";

-- DropTable
DROP TABLE "Series";

-- CreateTable
CREATE TABLE "MarkedArticles" (
    "id" SERIAL NOT NULL,
    "articleId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MarkedArticles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadedTimeCount" (
    "id" SERIAL NOT NULL,
    "times" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ReadedTimeCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MarkedArticles_userId_articleId_idx" ON "MarkedArticles"("userId", "articleId");

-- CreateIndex
CREATE UNIQUE INDEX "MarkedArticles_userId_articleId_key" ON "MarkedArticles"("userId", "articleId");

-- CreateIndex
CREATE INDEX "ReadedTimeCount_userId_articleId_idx" ON "ReadedTimeCount"("userId", "articleId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadedTimeCount_userId_articleId_key" ON "ReadedTimeCount"("userId", "articleId");

-- CreateIndex
CREATE INDEX "Article_categoryName_idx" ON "Article"("categoryName");

-- AddForeignKey
ALTER TABLE "MarkedArticles" ADD CONSTRAINT "MarkedArticles_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarkedArticles" ADD CONSTRAINT "MarkedArticles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadedTimeCount" ADD CONSTRAINT "ReadedTimeCount_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadedTimeCount" ADD CONSTRAINT "ReadedTimeCount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
