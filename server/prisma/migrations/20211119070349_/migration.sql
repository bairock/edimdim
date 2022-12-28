/*
  Warnings:

  - You are about to drop the column `block` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `block` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `block` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `block` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `block` on the `Stock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "block",
ADD COLUMN     "publish" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "block",
ADD COLUMN     "publish" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "block",
ADD COLUMN     "publish" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "block";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "block",
ADD COLUMN     "publish" BOOLEAN NOT NULL DEFAULT false;
