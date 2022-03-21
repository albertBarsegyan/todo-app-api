/*
  Warnings:

  - Made the column `userId` on table `todos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `statusId` on table `todos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `todos` MODIFY `userId` INTEGER NOT NULL,
    MODIFY `statusId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `task_statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
