/*
  Warnings:

  - You are about to drop the column `productId` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `colors` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `cuts` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `patterns` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_productId_fkey";

-- DropForeignKey
ALTER TABLE "colors" DROP CONSTRAINT "colors_productId_fkey";

-- DropForeignKey
ALTER TABLE "cuts" DROP CONSTRAINT "cuts_productId_fkey";

-- DropForeignKey
ALTER TABLE "materials" DROP CONSTRAINT "materials_productId_fkey";

-- DropForeignKey
ALTER TABLE "patterns" DROP CONSTRAINT "patterns_productId_fkey";

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "colors" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "cuts" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "materials" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "patterns" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "_ColorToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MaterialToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PatternToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CutToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ColorToProduct_AB_unique" ON "_ColorToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ColorToProduct_B_index" ON "_ColorToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MaterialToProduct_AB_unique" ON "_MaterialToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MaterialToProduct_B_index" ON "_MaterialToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PatternToProduct_AB_unique" ON "_PatternToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PatternToProduct_B_index" ON "_PatternToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CutToProduct_AB_unique" ON "_CutToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CutToProduct_B_index" ON "_CutToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToProduct_AB_unique" ON "_CollectionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToProduct_B_index" ON "_CollectionToProduct"("B");

-- AddForeignKey
ALTER TABLE "_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialToProduct" ADD CONSTRAINT "_MaterialToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialToProduct" ADD CONSTRAINT "_MaterialToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatternToProduct" ADD CONSTRAINT "_PatternToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "patterns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatternToProduct" ADD CONSTRAINT "_PatternToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CutToProduct" ADD CONSTRAINT "_CutToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "cuts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CutToProduct" ADD CONSTRAINT "_CutToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToProduct" ADD CONSTRAINT "_CollectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToProduct" ADD CONSTRAINT "_CollectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
