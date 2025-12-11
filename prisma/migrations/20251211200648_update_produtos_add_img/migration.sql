/*
  Warnings:

  - Added the required column `img` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "img" TEXT NOT NULL;
