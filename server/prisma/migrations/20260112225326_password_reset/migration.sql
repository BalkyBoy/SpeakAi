-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordResetExpires" TIMESTAMP(3),
ALTER COLUMN "emailVerificationToken" DROP NOT NULL,
ALTER COLUMN "resetPasswordToken" DROP NOT NULL;
