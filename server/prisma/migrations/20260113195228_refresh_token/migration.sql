-- AlterTable
ALTER TABLE "users" ADD COLUMN     "refreshTokenExpires" TIMESTAMP(3),
ADD COLUMN     "refreshTokenHash" TEXT;
