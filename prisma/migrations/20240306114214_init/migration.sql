-- CreateTable
CREATE TABLE "like" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "tweetid" INTEGER NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_tweetid_fkey" FOREIGN KEY ("tweetid") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
