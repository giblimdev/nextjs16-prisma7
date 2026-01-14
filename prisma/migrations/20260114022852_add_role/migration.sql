-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DEV', 'VENDOR', 'CLIENT', 'USER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "roles" "UserRole"[] DEFAULT ARRAY['USER']::"UserRole"[];
