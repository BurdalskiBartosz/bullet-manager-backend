/*
  Warnings:

  - You are about to drop the column `date` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `date`,
    MODIFY `inProgressTime` INTEGER;
