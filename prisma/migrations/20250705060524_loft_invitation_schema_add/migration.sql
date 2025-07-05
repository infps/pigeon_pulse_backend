-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED');

-- CreateTable
CREATE TABLE "LoftInvitation" (
    "id" TEXT NOT NULL,
    "loftId" TEXT NOT NULL,
    "invitedById" TEXT NOT NULL,
    "invitedUserId" TEXT,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoftInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoftInvitation_loftId_invitedById_invitedUserId_key" ON "LoftInvitation"("loftId", "invitedById", "invitedUserId");

-- AddForeignKey
ALTER TABLE "LoftInvitation" ADD CONSTRAINT "LoftInvitation_loftId_fkey" FOREIGN KEY ("loftId") REFERENCES "Loft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoftInvitation" ADD CONSTRAINT "LoftInvitation_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoftInvitation" ADD CONSTRAINT "LoftInvitation_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
