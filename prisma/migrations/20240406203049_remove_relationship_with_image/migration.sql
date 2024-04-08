/*
  Warnings:

  - You are about to drop the column `vendedorId` on the `imagem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `imagem` DROP FOREIGN KEY `imagem_vendedorId_fkey`;

-- AlterTable
ALTER TABLE `imagem` DROP COLUMN `vendedorId`;
