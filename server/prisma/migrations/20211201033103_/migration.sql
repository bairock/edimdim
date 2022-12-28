/*
  Warnings:

  - Added the required column `freeShippingAmount` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "freeShippingAmount" MONEY NOT NULL,
ALTER COLUMN "payoff" SET DEFAULT 0;
