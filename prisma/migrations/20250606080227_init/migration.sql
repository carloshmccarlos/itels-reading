/*
  Warnings:

  - The `categoryName` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Novel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `name` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryName" AS ENUM ('nature-geography', 'plant-research', 'animal-protection', 'space-exploration', 'school-education', 'technology-invention', 'culture-history', 'language-evolution', 'entertainment-sports', 'objects-materials', 'fashion-trends', 'diet-health', 'architecture-places', 'transportation-travel', 'national-government', 'society-economy', 'laws-regulations', 'battlefield-contention', 'social-roles', 'behavior-actions', 'physical-mental-health', 'time-date');

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_categoryName_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "categoryName",
ADD COLUMN     "categoryName" "CategoryName";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "name" "CategoryName" NOT NULL;

-- AlterTable
ALTER TABLE "Novel" DROP CONSTRAINT "Novel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Novel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Novel_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
