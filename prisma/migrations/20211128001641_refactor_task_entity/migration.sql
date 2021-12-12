/*
  Warnings:

  - You are about to drop the column `config` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `dateToEnd` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `config`,
    DROP COLUMN `dateToEnd`,
    DROP COLUMN `name`,
    ADD COLUMN `priority` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `spendTime` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `title` VARCHAR(191) NOT NULL DEFAULT '';
