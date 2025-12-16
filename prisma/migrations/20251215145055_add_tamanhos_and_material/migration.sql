/*
  Warnings:

  - Added the required column `material` to the `Produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tamanhos` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "material" TEXT NOT NULL,
ADD COLUMN     "tamanhos" JSONB NOT NULL;
