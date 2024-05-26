-- AlterTable
ALTER TABLE "like" ALTER COLUMN "userid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
