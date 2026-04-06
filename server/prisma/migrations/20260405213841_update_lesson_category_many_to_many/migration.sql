/*
  Warnings:

  - The primary key for the `lesson_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `lesson_categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `lesson_categories` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `lesson_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "lesson_categories_name_key";

-- AlterTable
ALTER TABLE "lesson_categories" DROP CONSTRAINT "lesson_categories_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD CONSTRAINT "lesson_categories_pkey" PRIMARY KEY ("lessonId", "categoryId");

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- AddForeignKey
ALTER TABLE "lesson_categories" ADD CONSTRAINT "lesson_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
