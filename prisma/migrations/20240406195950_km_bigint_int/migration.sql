/*
  Warnings:

  - You are about to alter the column `km` on the `veiculo` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `veiculo` MODIFY `km` INTEGER NOT NULL;
