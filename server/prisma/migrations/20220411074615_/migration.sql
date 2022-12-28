/*
  Warnings:

  - A unique constraint covering the columns `[pid]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pid" TEXT,
ALTER COLUMN "paymentStatus" SET DEFAULT E'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Order_pid_key" ON "Order"("pid");
