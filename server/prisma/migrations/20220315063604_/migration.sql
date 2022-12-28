/*
  Warnings:

  - A unique constraint covering the columns `[weight]` on the table `Moderator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Moderator_weight_key" ON "Moderator"("weight");
