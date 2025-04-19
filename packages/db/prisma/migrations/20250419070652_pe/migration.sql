-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "plan" "Plan" DEFAULT 'FREE';
