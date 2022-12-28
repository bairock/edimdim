/*
  Warnings:

  - You are about to drop the column `uuid` on the `Shipment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Shipment_uuid_key";

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "uuid";
