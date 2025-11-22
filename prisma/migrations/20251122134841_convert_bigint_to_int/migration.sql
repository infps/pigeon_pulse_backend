/*
  Warnings:

  - You are about to alter the column `PRIZE_VALUE` on the `AvgWinnerPrizes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `TRANSFER_DUE` on the `EventInventoryItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `ENTRY_FEE` on the `FeeScheme` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `FEES_CUT_PERCENT` on the `FeeScheme` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `HOT_SPOT1_FEE` on the `FeeScheme` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `HOT_SPOT2_FEE` on the `FeeScheme` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `HOT_SPOT3_FEE` on the `FeeScheme` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `HOT_SPOT_FINAL_FEE` on the `FeeScheme` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `IbeLogBlobFields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `LOG_TABLES_ID` on the `IbeLogBlobFields` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `IbeLogFields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `LOG_TABLES_ID` on the `IbeLogFields` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `IbeLogKeys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `LOG_TABLES_ID` on the `IbeLogKeys` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `IbeLogTables` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ID` on the `IbeLogTables` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `PERCH_FEE` on the `PerchFeeItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `PERC_VALUE` on the `StandardShowPercentage` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `AVG_SPEED_IN_MILES` on the `TmpAvgSpeed` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `AVG_SPEED_IN_YARDS` on the `TmpAvgSpeed` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `FLIGHT_TIME` on the `TmpAvgSpeed` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `BELGIAN_SHOW_1` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `BELGIAN_SHOW_2` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `BELGIAN_SHOW_3` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `BELGIAN_SHOW_4` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `BELGIAN_SHOW_5` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `BELGIAN_SHOW_6` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `BELGIAN_SHOW_7` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `STANDARD_SHOW_1` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `STANDARD_SHOW_2` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `STANDARD_SHOW_3` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `STANDARD_SHOW_4` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `STANDARD_SHOW_5` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `STANDARD_SHOW_6` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `TOTAL` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `WTA_1` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `WTA_2` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `WTA_3` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `WTA_4` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `WTA_5` on the `TmpBets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "AvgWinnerPrizes" ALTER COLUMN "PRIZE_VALUE" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "EventInventoryItem" ALTER COLUMN "TRANSFER_DUE" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "FeeScheme" ALTER COLUMN "ENTRY_FEE" SET DATA TYPE INTEGER,
ALTER COLUMN "FEES_CUT_PERCENT" SET DATA TYPE INTEGER,
ALTER COLUMN "HOT_SPOT1_FEE" SET DATA TYPE INTEGER,
ALTER COLUMN "HOT_SPOT2_FEE" SET DATA TYPE INTEGER,
ALTER COLUMN "HOT_SPOT3_FEE" SET DATA TYPE INTEGER,
ALTER COLUMN "HOT_SPOT_FINAL_FEE" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "IbeLogBlobFields" DROP CONSTRAINT "IbeLogBlobFields_pkey",
ALTER COLUMN "LOG_TABLES_ID" SET DATA TYPE INTEGER,
ADD CONSTRAINT "IbeLogBlobFields_pkey" PRIMARY KEY ("LOG_TABLES_ID");

-- AlterTable
ALTER TABLE "IbeLogFields" DROP CONSTRAINT "IbeLogFields_pkey",
ALTER COLUMN "LOG_TABLES_ID" SET DATA TYPE INTEGER,
ADD CONSTRAINT "IbeLogFields_pkey" PRIMARY KEY ("LOG_TABLES_ID");

-- AlterTable
ALTER TABLE "IbeLogKeys" DROP CONSTRAINT "IbeLogKeys_pkey",
ALTER COLUMN "LOG_TABLES_ID" SET DATA TYPE INTEGER,
ADD CONSTRAINT "IbeLogKeys_pkey" PRIMARY KEY ("LOG_TABLES_ID");

-- AlterTable
ALTER TABLE "IbeLogTables" DROP CONSTRAINT "IbeLogTables_pkey",
ALTER COLUMN "ID" SET DATA TYPE INTEGER,
ADD CONSTRAINT "IbeLogTables_pkey" PRIMARY KEY ("ID");

-- AlterTable
ALTER TABLE "PerchFeeItem" ALTER COLUMN "PERCH_FEE" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "StandardShowPercentage" ALTER COLUMN "PERC_VALUE" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TmpAvgSpeed" ALTER COLUMN "AVG_SPEED_IN_MILES" SET DATA TYPE INTEGER,
ALTER COLUMN "AVG_SPEED_IN_YARDS" SET DATA TYPE INTEGER,
ALTER COLUMN "FLIGHT_TIME" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TmpBets" ALTER COLUMN "BELGIAN_SHOW_1" SET DATA TYPE INTEGER,
ALTER COLUMN "BELGIAN_SHOW_2" SET DATA TYPE INTEGER,
ALTER COLUMN "BELGIAN_SHOW_3" SET DATA TYPE INTEGER,
ALTER COLUMN "BELGIAN_SHOW_4" SET DATA TYPE INTEGER,
ALTER COLUMN "BELGIAN_SHOW_5" SET DATA TYPE INTEGER,
ALTER COLUMN "BELGIAN_SHOW_6" SET DATA TYPE INTEGER,
ALTER COLUMN "BELGIAN_SHOW_7" SET DATA TYPE INTEGER,
ALTER COLUMN "STANDARD_SHOW_1" SET DATA TYPE INTEGER,
ALTER COLUMN "STANDARD_SHOW_2" SET DATA TYPE INTEGER,
ALTER COLUMN "STANDARD_SHOW_3" SET DATA TYPE INTEGER,
ALTER COLUMN "STANDARD_SHOW_4" SET DATA TYPE INTEGER,
ALTER COLUMN "STANDARD_SHOW_5" SET DATA TYPE INTEGER,
ALTER COLUMN "STANDARD_SHOW_6" SET DATA TYPE INTEGER,
ALTER COLUMN "TOTAL" SET DATA TYPE INTEGER,
ALTER COLUMN "WTA_1" SET DATA TYPE INTEGER,
ALTER COLUMN "WTA_2" SET DATA TYPE INTEGER,
ALTER COLUMN "WTA_3" SET DATA TYPE INTEGER,
ALTER COLUMN "WTA_4" SET DATA TYPE INTEGER,
ALTER COLUMN "WTA_5" SET DATA TYPE INTEGER;
