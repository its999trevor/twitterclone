/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "retweet" DROP CONSTRAINT "retweet_retweetby_fkey";

-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_userid_fkey";

-- AlterTable
ALTER TABLE "retweet" ALTER COLUMN "retweetby" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tweet" ALTER COLUMN "userid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweet" ADD CONSTRAINT "retweet_retweetby_fkey" FOREIGN KEY ("retweetby") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
