/*
  Warnings:

  - You are about to drop the column `copies` on the `Book` table. All the data in the column will be lost.
  - Added the required column `availableCopies` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "copies",
ADD COLUMN     "availableCopies" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
