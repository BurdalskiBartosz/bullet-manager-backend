-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `author` VARCHAR(191) NOT NULL DEFAULT '',
    `mark` INTEGER NOT NULL DEFAULT 0,
    `cover` VARCHAR(191) NOT NULL DEFAULT '',
    `readingsNumber` INTEGER NOT NULL DEFAULT 0,
    `state` VARCHAR(191) NOT NULL DEFAULT 'to_read',
    `opinion` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;