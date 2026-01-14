/*
  Warnings:

  - You are about to drop the column `clientId` on the `fidelities` table. All the data in the column will be lost.
  - You are about to drop the column `xpPointid` on the `fidelities` table. All the data in the column will be lost.
  - You are about to drop the `XpPoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FidelityToXpPoint` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `fidelities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `fidelities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FidelityToXpPoint" DROP CONSTRAINT "_FidelityToXpPoint_A_fkey";

-- DropForeignKey
ALTER TABLE "_FidelityToXpPoint" DROP CONSTRAINT "_FidelityToXpPoint_B_fkey";

-- DropForeignKey
ALTER TABLE "fidelities" DROP CONSTRAINT "fidelities_clientId_fkey";

-- DropIndex
DROP INDEX "fidelities_clientId_idx";

-- AlterTable
ALTER TABLE "fidelities" DROP COLUMN "clientId",
DROP COLUMN "xpPointid",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "XpPoint";

-- DropTable
DROP TABLE "_FidelityToXpPoint";

-- CreateTable
CREATE TABLE "xp_points" (
    "id" TEXT NOT NULL,
    "fidelityId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xp_points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "xp_points_fidelityId_idx" ON "xp_points"("fidelityId");

-- CreateIndex
CREATE UNIQUE INDEX "fidelities_userId_key" ON "fidelities"("userId");

-- CreateIndex
CREATE INDEX "fidelities_userId_idx" ON "fidelities"("userId");

-- AddForeignKey
ALTER TABLE "fidelities" ADD CONSTRAINT "fidelities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "xp_points" ADD CONSTRAINT "xp_points_fidelityId_fkey" FOREIGN KEY ("fidelityId") REFERENCES "fidelities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
