-- Reset all auto-increment sequences to continue from the highest existing ID
-- Run this SQL in your PostgreSQL database

SELECT setval(pg_get_serial_sequence('"AvgWinnerPrizes"', 'ID_EVENT_INVENTORY_ITEM'), 
              COALESCE((SELECT MAX("ID_EVENT_INVENTORY_ITEM") FROM "AvgWinnerPrizes"), 1), true);

SELECT setval(pg_get_serial_sequence('"Basket"', 'ID_BASKET'), 
              COALESCE((SELECT MAX("ID_BASKET") FROM "Basket"), 1), true);

SELECT setval(pg_get_serial_sequence('"BettingScheme"', 'ID_BETTING_SCHEME'), 
              COALESCE((SELECT MAX("ID_BETTING_SCHEME") FROM "BettingScheme"), 1), true);

SELECT setval(pg_get_serial_sequence('"Birds"', 'ID_BIRD'), 
              COALESCE((SELECT MAX("ID_BIRD") FROM "Birds"), 1), true);

SELECT setval(pg_get_serial_sequence('"BirdsView"', 'ID_BIRD'), 
              COALESCE((SELECT MAX("ID_BIRD") FROM "BirdsView"), 1), true);

SELECT setval(pg_get_serial_sequence('"Breeders"', 'ID_BREEDER'), 
              COALESCE((SELECT MAX("ID_BREEDER") FROM "Breeders"), 1), true);

SELECT setval(pg_get_serial_sequence('"DatasyncSys"', 'ID'), 
              COALESCE((SELECT MAX("ID") FROM "DatasyncSys"), 1), true);

SELECT setval(pg_get_serial_sequence('"DatasyncWeb"', 'ID'), 
              COALESCE((SELECT MAX("ID") FROM "DatasyncWeb"), 1), true);

SELECT setval(pg_get_serial_sequence('"Events"', 'ID_EVENT'), 
              COALESCE((SELECT MAX("ID_EVENT") FROM "Events"), 1), true);

SELECT setval(pg_get_serial_sequence('"EventInventory"', 'ID_EVENT_INVENTORY'), 
              COALESCE((SELECT MAX("ID_EVENT_INVENTORY") FROM "EventInventory"), 1), true);

SELECT setval(pg_get_serial_sequence('"EventInventoryItem"', 'ID_EVENT_INVENTORY_ITEM'), 
              COALESCE((SELECT MAX("ID_EVENT_INVENTORY_ITEM") FROM "EventInventoryItem"), 1), true);

SELECT setval(pg_get_serial_sequence('"FeeScheme"', 'ID_FEE_SCHEME'), 
              COALESCE((SELECT MAX("ID_FEE_SCHEME") FROM "FeeScheme"), 1), true);

SELECT setval(pg_get_serial_sequence('"IbeLogBlobFields"', 'LOG_TABLES_ID'), 
              COALESCE((SELECT MAX("LOG_TABLES_ID") FROM "IbeLogBlobFields"), 1), true);

SELECT setval(pg_get_serial_sequence('"IbeLogFields"', 'LOG_TABLES_ID'), 
              COALESCE((SELECT MAX("LOG_TABLES_ID") FROM "IbeLogFields"), 1), true);

SELECT setval(pg_get_serial_sequence('"IbeLogKeys"', 'LOG_TABLES_ID'), 
              COALESCE((SELECT MAX("LOG_TABLES_ID") FROM "IbeLogKeys"), 1), true);

SELECT setval(pg_get_serial_sequence('"IbeLogTables"', 'ID'), 
              COALESCE((SELECT MAX("ID") FROM "IbeLogTables"), 1), true);

SELECT setval(pg_get_serial_sequence('"Log"', 'ID_LOG'), 
              COALESCE((SELECT MAX("ID_LOG") FROM "Log"), 1), true);

SELECT setval(pg_get_serial_sequence('"LostHistory"', 'ID_LOST_HISTORY'), 
              COALESCE((SELECT MAX("ID_LOST_HISTORY") FROM "LostHistory"), 1), true);

SELECT setval(pg_get_serial_sequence('"OrganizerData"', 'ID'), 
              COALESCE((SELECT MAX("ID") FROM "OrganizerData"), 1), true);

SELECT setval(pg_get_serial_sequence('"Payments"', 'ID_PAYMENT'), 
              COALESCE((SELECT MAX("ID_PAYMENT") FROM "Payments"), 1), true);

SELECT setval(pg_get_serial_sequence('"PerchFeeItem"', 'ID_PERCH_FEE_ITEM'), 
              COALESCE((SELECT MAX("ID_PERCH_FEE_ITEM") FROM "PerchFeeItem"), 1), true);

SELECT setval(pg_get_serial_sequence('"Picture"', 'ID_PICTURE'), 
              COALESCE((SELECT MAX("ID_PICTURE") FROM "Picture"), 1), true);

SELECT setval(pg_get_serial_sequence('"PrizeScheme"', 'ID_PRIZE_SCHEME'), 
              COALESCE((SELECT MAX("ID_PRIZE_SCHEME") FROM "PrizeScheme"), 1), true);

SELECT setval(pg_get_serial_sequence('"PrizeSchemeItem"', 'ID_PRIZE_SCHEME_ITEM'), 
              COALESCE((SELECT MAX("ID_PRIZE_SCHEME_ITEM") FROM "PrizeSchemeItem"), 1), true);

SELECT setval(pg_get_serial_sequence('"PrizeValue"', 'ID_PRIZE_VALUE'), 
              COALESCE((SELECT MAX("ID_PRIZE_VALUE") FROM "PrizeValue"), 1), true);

SELECT setval(pg_get_serial_sequence('"Race"', 'ID_RACE'), 
              COALESCE((SELECT MAX("ID_RACE") FROM "Race"), 1), true);

SELECT setval(pg_get_serial_sequence('"RaceIgnoreBird"', 'ID_IGNORE_BIRD'), 
              COALESCE((SELECT MAX("ID_IGNORE_BIRD") FROM "RaceIgnoreBird"), 1), true);

SELECT setval(pg_get_serial_sequence('"RaceItem"', 'ID_RACE_ITEM'), 
              COALESCE((SELECT MAX("ID_RACE_ITEM") FROM "RaceItem"), 1), true);

SELECT setval(pg_get_serial_sequence('"RaceNumberGroup"', 'ID_RACE_NUMBER_GROUP'), 
              COALESCE((SELECT MAX("ID_RACE_NUMBER_GROUP") FROM "RaceNumberGroup"), 1), true);

SELECT setval(pg_get_serial_sequence('"RacePhantomBird"', 'ID_RACE_PHANTOM_BIRD'), 
              COALESCE((SELECT MAX("ID_RACE_PHANTOM_BIRD") FROM "RacePhantomBird"), 1), true);

SELECT setval(pg_get_serial_sequence('"RaceType"', 'ID_RACE_TYPE'), 
              COALESCE((SELECT MAX("ID_RACE_TYPE") FROM "RaceType"), 1), true);

SELECT setval(pg_get_serial_sequence('"Reports"', 'ID_REPORT'), 
              COALESCE((SELECT MAX("ID_REPORT") FROM "Reports"), 1), true);

SELECT setval(pg_get_serial_sequence('"ReportIds"', 'ID'), 
              COALESCE((SELECT MAX("ID") FROM "ReportIds"), 1), true);

SELECT setval(pg_get_serial_sequence('"RightGroups"', 'ID_RIGHT_GROUP'), 
              COALESCE((SELECT MAX("ID_RIGHT_GROUP") FROM "RightGroups"), 1), true);

SELECT setval(pg_get_serial_sequence('"RightGroupLines"', 'ID_RIGHT_GROUP_LINE'), 
              COALESCE((SELECT MAX("ID_RIGHT_GROUP_LINE") FROM "RightGroupLines"), 1), true);

SELECT setval(pg_get_serial_sequence('"StandardShowPercentage"', 'ID_STANDARD_SHOW_PERCENTAGE'), 
              COALESCE((SELECT MAX("ID_STANDARD_SHOW_PERCENTAGE") FROM "StandardShowPercentage"), 1), true);

SELECT setval(pg_get_serial_sequence('"SystemRequirements"', 'ID_INFO_UPDATE'), 
              COALESCE((SELECT MAX("ID_INFO_UPDATE") FROM "SystemRequirements"), 1), true);

SELECT setval(pg_get_serial_sequence('"SystemUpdates"', 'ID_SYSTEM_UPDATE'), 
              COALESCE((SELECT MAX("ID_SYSTEM_UPDATE") FROM "SystemUpdates"), 1), true);

SELECT setval(pg_get_serial_sequence('"TmpAvgSpeed"', 'ID_EVENT_INVENTORY_ITEM'), 
              COALESCE((SELECT MAX("ID_EVENT_INVENTORY_ITEM") FROM "TmpAvgSpeed"), 1), true);

SELECT setval(pg_get_serial_sequence('"TmpBets"', 'ID_RACE_ITEM'), 
              COALESCE((SELECT MAX("ID_RACE_ITEM") FROM "TmpBets"), 1), true);

SELECT setval(pg_get_serial_sequence('"TmpId"', 'ID'), 
              COALESCE((SELECT MAX("ID") FROM "TmpId"), 1), true);

SELECT setval(pg_get_serial_sequence('"Users"', 'ID_USER'), 
              COALESCE((SELECT MAX("ID_USER") FROM "Users"), 1), true);

SELECT setval(pg_get_serial_sequence('"UserRightGroups"', 'ID_USER_RIGHT_GROUP'), 
              COALESCE((SELECT MAX("ID_USER_RIGHT_GROUP") FROM "UserRightGroups"), 1), true);-- This is an empty migration.