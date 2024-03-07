-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
