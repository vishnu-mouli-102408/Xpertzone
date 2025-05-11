/*
  Warnings:

  - You are about to drop the column `duration` on the `Call` table. All the data in the column will be lost.
  - You are about to drop the `ScheduledCall` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "CallStatus" ADD VALUE 'SCHEDULED';

-- DropForeignKey
ALTER TABLE "ScheduledCall" DROP CONSTRAINT "ScheduledCall_actualCallId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledCall" DROP CONSTRAINT "ScheduledCall_expertId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledCall" DROP CONSTRAINT "ScheduledCall_userId_fkey";

-- AlterTable
ALTER TABLE "Call" DROP COLUMN "duration",
ALTER COLUMN "startedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "ScheduledCall";

-- DropEnum
DROP TYPE "ScheduledCallStatus";
