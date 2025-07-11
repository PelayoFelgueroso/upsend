/*
  Warnings:

  - You are about to drop the column `messageId` on the `email_logs` table. All the data in the column will be lost.
  - Added the required column `content` to the `email_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_logs" DROP COLUMN "messageId",
ADD COLUMN     "content" TEXT NOT NULL;
