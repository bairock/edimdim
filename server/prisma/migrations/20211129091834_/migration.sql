-- DropForeignKey
ALTER TABLE "Moderator" DROP CONSTRAINT "Moderator_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Moderator" ALTER COLUMN "restaurantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Moderator" ADD CONSTRAINT "Moderator_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
