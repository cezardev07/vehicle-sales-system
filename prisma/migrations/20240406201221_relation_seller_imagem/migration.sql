/*
  Warnings:

  - Added the required column `vendedorId` to the `imagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `imagem` ADD COLUMN `vendedorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `imagem` ADD CONSTRAINT `imagem_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `vendedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
