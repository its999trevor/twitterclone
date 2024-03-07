-- CreateTable
CREATE TABLE "retweet" (
    "id" SERIAL NOT NULL,
    "tweetid" INTEGER NOT NULL,
    "retweetby" INTEGER NOT NULL,

    CONSTRAINT "retweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "retweet" ADD CONSTRAINT "retweet_retweetby_fkey" FOREIGN KEY ("retweetby") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweet" ADD CONSTRAINT "retweet_tweetid_fkey" FOREIGN KEY ("tweetid") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
