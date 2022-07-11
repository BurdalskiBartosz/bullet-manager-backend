/*
  Warnings:

  - You are about to drop the column `dataId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `subtask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `subtask` DROP FOREIGN KEY `Subtask_subtaskOfId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_dataId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `dataId`;

-- DropTable
DROP TABLE `subtask`;
