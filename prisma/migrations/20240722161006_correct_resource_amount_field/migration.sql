/*
  Warnings:

  - You are about to drop the column `ammount` on the `resources` table. All the data in the column will be lost.
  - Added the required column `amount` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resources" DROP COLUMN "ammount",
ADD COLUMN     "amount" INTEGER NOT NULL;
