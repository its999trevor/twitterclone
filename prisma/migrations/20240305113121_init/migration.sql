/*
  Warnings:

  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_username_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "bio",
DROP COLUMN "fullname",
DROP COLUMN "username",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
