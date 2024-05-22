-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'Student',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeacherProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qualification` VARCHAR(191) NOT NULL,
    `experience` INTEGER NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `about` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `TeacherProfile_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeacherProfile` ADD CONSTRAINT `TeacherProfile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
