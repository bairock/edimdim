/*
  Warnings:

  - You are about to drop the column `weight` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Moderator" ADD COLUMN     "weight" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "weight";
