/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Quota` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Quota" ALTER COLUMN "count" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Quota_userId_key" ON "Quota"("userId");
