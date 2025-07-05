-- DropForeignKey
ALTER TABLE "Bird" DROP CONSTRAINT "Bird_loftId_fkey";

-- DropForeignKey
ALTER TABLE "Loft" DROP CONSTRAINT "Loft_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoftInvitation" DROP CONSTRAINT "LoftInvitation_invitedById_fkey";

-- DropForeignKey
ALTER TABLE "LoftInvitation" DROP CONSTRAINT "LoftInvitation_invitedUserId_fkey";

-- DropForeignKey
ALTER TABLE "LoftInvitation" DROP CONSTRAINT "LoftInvitation_loftId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "RaceEntry" DROP CONSTRAINT "RaceEntry_birdId_fkey";

-- DropForeignKey
ALTER TABLE "RaceEntry" DROP CONSTRAINT "RaceEntry_raceId_fkey";

-- DropForeignKey
ALTER TABLE "RaceEntry" DROP CONSTRAINT "RaceEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedLoft" DROP CONSTRAINT "SharedLoft_loftId_fkey";

-- DropForeignKey
ALTER TABLE "SharedLoft" DROP CONSTRAINT "SharedLoft_userId_fkey";

-- AddForeignKey
ALTER TABLE "Loft" ADD CONSTRAINT "Loft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedLoft" ADD CONSTRAINT "SharedLoft_loftId_fkey" FOREIGN KEY ("loftId") REFERENCES "Loft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedLoft" ADD CONSTRAINT "SharedLoft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bird" ADD CONSTRAINT "Bird_loftId_fkey" FOREIGN KEY ("loftId") REFERENCES "Loft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoftInvitation" ADD CONSTRAINT "LoftInvitation_loftId_fkey" FOREIGN KEY ("loftId") REFERENCES "Loft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoftInvitation" ADD CONSTRAINT "LoftInvitation_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoftInvitation" ADD CONSTRAINT "LoftInvitation_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceEntry" ADD CONSTRAINT "RaceEntry_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceEntry" ADD CONSTRAINT "RaceEntry_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "Bird"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceEntry" ADD CONSTRAINT "RaceEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
