/*
  Warnings:

  - Added the required column `bio` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tweet" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);
