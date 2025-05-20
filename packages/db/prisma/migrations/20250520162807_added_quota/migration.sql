/*
  Warnings:

  - A unique constraint covering the columns `[userId,year,month]` on the table `Quota` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Quota_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Quota_userId_year_month_key" ON "Quota"("userId", "year", "month");
