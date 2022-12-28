/*
  Warnings:

  - You are about to drop the column `freeOrderAmount` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `freeOrderCount` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `freeShippingAmount` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "freeOrderAmount",
DROP COLUMN "freeOrderCount",
DROP COLUMN "freeShippingAmount";
