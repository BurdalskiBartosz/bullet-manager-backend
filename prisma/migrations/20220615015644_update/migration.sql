/*
  Warnings:

  - A unique constraint covering the columns `[dataId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdById` INTEGER NOT NULL,
    ADD COLUMN `dataId` INTEGER,
    MODIFY `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Subtask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order` INTEGER NOT NULL,
    `subtaskOfId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Task_dataId_unique` ON `Task`(`dataId`);

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_dataId_fkey` FOREIGN KEY (`dataId`) REFERENCES `Subtask`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subtask` ADD CONSTRAINT `Subtask_subtaskOfId_fkey` FOREIGN KEY (`subtaskOfId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
