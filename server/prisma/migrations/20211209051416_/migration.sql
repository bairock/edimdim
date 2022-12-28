/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "orderStatus" TEXT NOT NULL DEFAULT E'new',
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT E'pending';
