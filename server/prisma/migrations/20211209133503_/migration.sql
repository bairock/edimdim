/*
  Warnings:

  - You are about to drop the column `geoPoint` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "geoPoint" JSONB;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "geoPoint";
