-- CreateTable
CREATE TABLE "AvgWinnerPrizes" (
    "id_event_inventory_item" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,
    "prize_value" BIGINT NOT NULL,

    CONSTRAINT "AvgWinnerPrizes_pkey" PRIMARY KEY ("id_event_inventory_item")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id_basket" INTEGER NOT NULL,
    "id_race" INTEGER NOT NULL,
    "basket_no" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "is_race_basket" INTEGER NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id_basket")
);

-- CreateTable
CREATE TABLE "BettingScheme" (
    "id_betting_scheme" INTEGER NOT NULL,
    "betting_scheme_name" TEXT NOT NULL,
    "betting_cut_percent" BIGINT NOT NULL,
    "belgian_show_1" BIGINT NOT NULL,
    "belgian_show_2" BIGINT NOT NULL,
    "belgian_show_3" BIGINT NOT NULL,
    "belgian_show_4" BIGINT NOT NULL,
    "belgian_show_5" BIGINT NOT NULL,
    "belgian_show_6" BIGINT NOT NULL,
    "belgian_show_7" BIGINT NOT NULL,
    "standard_show_1" BIGINT NOT NULL,
    "standard_show_2" BIGINT NOT NULL,
    "standard_show_3" BIGINT NOT NULL,
    "standard_show_4" BIGINT NOT NULL,
    "standard_show_5" BIGINT NOT NULL,
    "standard_show_6" BIGINT NOT NULL,
    "wta_1" BIGINT NOT NULL,
    "wta_2" BIGINT NOT NULL,
    "wta_3" BIGINT NOT NULL,
    "wta_4" BIGINT NOT NULL,
    "wta_5" BIGINT NOT NULL,

    CONSTRAINT "BettingScheme_pkey" PRIMARY KEY ("id_betting_scheme")
);

-- CreateTable
CREATE TABLE "Birds" (
    "id_bird" INTEGER NOT NULL,
    "band" TEXT NOT NULL,
    "band_1" TEXT NOT NULL,
    "band_2" TEXT NOT NULL,
    "band_3" TEXT NOT NULL,
    "band_4" TEXT NOT NULL,
    "bird_name" TEXT NOT NULL,
    "rf_id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sex" INTEGER NOT NULL,
    "is_active" INTEGER NOT NULL,
    "is_race_verified" INTEGER NOT NULL,
    "is_lost" INTEGER NOT NULL,
    "lost_date" TIMESTAMP(3) NOT NULL,
    "lost_id_race" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "id_picture" INTEGER NOT NULL,
    "play_attention_sound" INTEGER NOT NULL,

    CONSTRAINT "Birds_pkey" PRIMARY KEY ("id_bird")
);

-- CreateTable
CREATE TABLE "BirdsView" (
    "id_bird" INTEGER NOT NULL,
    "band" TEXT NOT NULL,
    "band_1" TEXT NOT NULL,
    "band_2" TEXT NOT NULL,
    "band_3" TEXT NOT NULL,
    "band_4" TEXT NOT NULL,
    "bird_name" TEXT NOT NULL,
    "rf_id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sex" INTEGER NOT NULL,
    "is_active" INTEGER NOT NULL,
    "is_race_verified" INTEGER NOT NULL,
    "is_lost" INTEGER NOT NULL,
    "lost_date" TIMESTAMP(3) NOT NULL,
    "lost_id_race" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "id_picture" INTEGER NOT NULL,
    "play_attention_sound" INTEGER NOT NULL,

    CONSTRAINT "BirdsView_pkey" PRIMARY KEY ("id_bird")
);

-- CreateTable
CREATE TABLE "Breeders" (
    "id_breeder" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "is_default_address_1" INTEGER NOT NULL,
    "address_1" TEXT NOT NULL,
    "city_1" TEXT NOT NULL,
    "state_1" TEXT NOT NULL,
    "zip_1" TEXT NOT NULL,
    "address_2" TEXT NOT NULL,
    "city_2" TEXT NOT NULL,
    "state_2" TEXT NOT NULL,
    "zip_2" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cell" TEXT NOT NULL,
    "fax" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_2" TEXT NOT NULL,
    "web_address" TEXT NOT NULL,
    "social_security_number" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "status_date" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "login_name" TEXT NOT NULL,
    "login_password" TEXT NOT NULL,
    "id_picture" INTEGER NOT NULL,
    "sms" TEXT NOT NULL,
    "tax_number" TEXT NOT NULL,
    "def_name_agn" TEXT NOT NULL,
    "def_name_as" TEXT NOT NULL,

    CONSTRAINT "Breeders_pkey" PRIMARY KEY ("id_breeder")
);

-- CreateTable
CREATE TABLE "DatasyncSys" (
    "id" INTEGER NOT NULL,
    "dsext_ver" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DatasyncSys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatasyncWeb" (
    "id" INTEGER NOT NULL,
    "processed" INTEGER NOT NULL,
    "dbtable" TEXT NOT NULL,
    "dboperation" TEXT NOT NULL,
    "dbtableidcolname" TEXT NOT NULL,
    "dbtablerowid" INTEGER NOT NULL,
    "dbtablerow" BYTEA NOT NULL,

    CONSTRAINT "DatasyncWeb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id_event" INTEGER NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_short_name" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "id_fee_scheme" INTEGER NOT NULL,
    "id_final_prize_scheme" INTEGER NOT NULL,
    "id_hot_spot1_prize_scheme" INTEGER NOT NULL,
    "id_hot_spot2_prize_scheme" INTEGER NOT NULL,
    "id_hot_spot3_prize_scheme" INTEGER NOT NULL,
    "id_hot_spot_avg_prize_scheme" INTEGER NOT NULL,
    "id_betting_scheme" INTEGER NOT NULL,
    "is_open" INTEGER NOT NULL,
    "event_type" INTEGER NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "EventInventory" (
    "id_event_inventory" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,
    "id_breeder" INTEGER NOT NULL,
    "sign_in_date" TIMESTAMP(3) NOT NULL,
    "waiting_date" TIMESTAMP(3) NOT NULL,
    "is_waiting" INTEGER NOT NULL,
    "reserved_birds" INTEGER NOT NULL,
    "loft" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "EventInventory_pkey" PRIMARY KEY ("id_event_inventory")
);

-- CreateTable
CREATE TABLE "EventInventoryItem" (
    "id_event_inventory_item" INTEGER NOT NULL,
    "id_event_inventory" INTEGER NOT NULL,
    "id_bird" INTEGER NOT NULL,
    "bird_no" INTEGER NOT NULL,
    "arrival_date" TIMESTAMP(3) NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "perch_fee_value" BIGINT NOT NULL,
    "entry_fee_value" BIGINT NOT NULL,
    "entry_fee_paid" INTEGER NOT NULL,
    "entry_refund" BIGINT NOT NULL,
    "bets_refund" BIGINT NOT NULL,
    "hot_spot_fee_value" BIGINT NOT NULL,
    "hot_spot_refund" BIGINT NOT NULL,
    "id_replaced_item" INTEGER NOT NULL,
    "is_backup" INTEGER NOT NULL,
    "belgian_show_bet_1" INTEGER NOT NULL,
    "belgian_show_bet_2" INTEGER NOT NULL,
    "belgian_show_bet_3" INTEGER NOT NULL,
    "belgian_show_bet_4" INTEGER NOT NULL,
    "belgian_show_bet_5" INTEGER NOT NULL,
    "belgian_show_bet_6" INTEGER NOT NULL,
    "belgian_show_bet_7" INTEGER NOT NULL,
    "standard_show_bet_1" INTEGER NOT NULL,
    "standard_show_bet_2" INTEGER NOT NULL,
    "standard_show_bet_3" INTEGER NOT NULL,
    "standard_show_bet_4" INTEGER NOT NULL,
    "standard_show_bet_5" INTEGER NOT NULL,
    "standard_show_bet_6" INTEGER NOT NULL,
    "wta_bet_1" INTEGER NOT NULL,
    "wta_bet_2" INTEGER NOT NULL,
    "wta_bet_3" INTEGER NOT NULL,
    "wta_bet_4" INTEGER NOT NULL,
    "wta_bet_5" INTEGER NOT NULL,
    "is_bet_active" INTEGER NOT NULL,
    "transfer_due" BIGINT NOT NULL,

    CONSTRAINT "EventInventoryItem_pkey" PRIMARY KEY ("id_event_inventory_item")
);

-- CreateTable
CREATE TABLE "EventRaceNumber" (
    "id_number_group" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,
    "number_range_from" INTEGER NOT NULL,
    "number_range_to" INTEGER NOT NULL,

    CONSTRAINT "EventRaceNumber_pkey" PRIMARY KEY ("id_number_group")
);

-- CreateTable
CREATE TABLE "FeeScheme" (
    "id_fee_scheme" INTEGER NOT NULL,
    "fee_scheme_name" TEXT NOT NULL,
    "entry_fee" BIGINT NOT NULL,
    "is_refundable" INTEGER NOT NULL,
    "min_entry_fees" INTEGER NOT NULL,
    "max_bird_count" INTEGER NOT NULL,
    "max_backup_bird_count" INTEGER NOT NULL,
    "is_floating_backup" INTEGER NOT NULL,
    "fees_cut_percent" BIGINT NOT NULL,
    "hot_spot1_fee" BIGINT NOT NULL,
    "hot_spot2_fee" BIGINT NOT NULL,
    "hot_spot3_fee" BIGINT NOT NULL,
    "hot_spot_final_fee" BIGINT NOT NULL,

    CONSTRAINT "FeeScheme_pkey" PRIMARY KEY ("id_fee_scheme")
);

-- CreateTable
CREATE TABLE "IbeLogBlobFields" (
    "log_tables_id" BIGINT NOT NULL,
    "field_name" TEXT NOT NULL,
    "old_char_value" TEXT NOT NULL,
    "new_char_value" TEXT NOT NULL,
    "old_blob_value" BYTEA NOT NULL,
    "new_blob_value" BYTEA NOT NULL,

    CONSTRAINT "IbeLogBlobFields_pkey" PRIMARY KEY ("log_tables_id")
);

-- CreateTable
CREATE TABLE "IbeLogFields" (
    "log_tables_id" BIGINT NOT NULL,
    "field_name" TEXT NOT NULL,
    "old_value" TEXT NOT NULL,
    "new_value" TEXT NOT NULL,

    CONSTRAINT "IbeLogFields_pkey" PRIMARY KEY ("log_tables_id")
);

-- CreateTable
CREATE TABLE "IbeLogKeys" (
    "log_tables_id" BIGINT NOT NULL,
    "key_field" TEXT NOT NULL,
    "key_value" TEXT NOT NULL,

    CONSTRAINT "IbeLogKeys_pkey" PRIMARY KEY ("log_tables_id")
);

-- CreateTable
CREATE TABLE "IbeLogTables" (
    "id" BIGINT NOT NULL,
    "table_name" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "IbeLogTables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id_log" INTEGER NOT NULL,
    "log_level" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dt_logged" TIMESTAMP(3) NOT NULL,
    "id_user" INTEGER NOT NULL,
    "machine" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id_log")
);

-- CreateTable
CREATE TABLE "LogUserLoggedin" (
    "id_log" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LogUserLoggedout" (
    "id_log" INTEGER NOT NULL,
    "id_logged_in" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LostHistory" (
    "id_lost_history" INTEGER NOT NULL,
    "id_bird" INTEGER NOT NULL,
    "lost_date" TIMESTAMP(3) NOT NULL,
    "is_lost" INTEGER NOT NULL,
    "id_race" INTEGER NOT NULL,

    CONSTRAINT "LostHistory_pkey" PRIMARY KEY ("id_lost_history")
);

-- CreateTable
CREATE TABLE "OrganizerData" (
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "web" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cell" TEXT NOT NULL,
    "fax" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "OrganizerData_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Partners" (
    "id_event_inventory" INTEGER NOT NULL,
    "id_breeder" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Payments" (
    "id_payment" INTEGER NOT NULL,
    "id_event_inventory" INTEGER NOT NULL,
    "payment_type" INTEGER NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "payment_value" BIGINT NOT NULL,
    "payment_method" INTEGER NOT NULL,
    "payment_desc" TEXT NOT NULL,
    "payment_timestamp" TIMESTAMP(3) NOT NULL,
    "id_picture" INTEGER NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id_payment")
);

-- CreateTable
CREATE TABLE "PerchFeeItem" (
    "id_perch_fee_item" INTEGER NOT NULL,
    "bird_no" INTEGER NOT NULL,
    "perch_fee" BIGINT NOT NULL,
    "id_fee_scheme" INTEGER NOT NULL,

    CONSTRAINT "PerchFeeItem_pkey" PRIMARY KEY ("id_perch_fee_item")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id_picture" INTEGER NOT NULL,
    "picture" BYTEA NOT NULL,
    "picture_type" TEXT NOT NULL,
    "picture_layout" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id_picture")
);

-- CreateTable
CREATE TABLE "PrizeScheme" (
    "id_prize_scheme" INTEGER NOT NULL,
    "prize_name" TEXT NOT NULL,

    CONSTRAINT "PrizeScheme_pkey" PRIMARY KEY ("id_prize_scheme")
);

-- CreateTable
CREATE TABLE "PrizeSchemeItem" (
    "id_prize_scheme_item" INTEGER NOT NULL,
    "from_position" INTEGER NOT NULL,
    "to_position" INTEGER NOT NULL,
    "prize_value" BIGINT NOT NULL,
    "id_prize_scheme" INTEGER NOT NULL,

    CONSTRAINT "PrizeSchemeItem_pkey" PRIMARY KEY ("id_prize_scheme_item")
);

-- CreateTable
CREATE TABLE "PrizeValue" (
    "id_prize_value" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,
    "id_race_type" INTEGER NOT NULL,
    "id_prize_scheme_item" INTEGER NOT NULL,
    "prize_value" BIGINT NOT NULL,

    CONSTRAINT "PrizeValue_pkey" PRIMARY KEY ("id_prize_value")
);

-- CreateTable
CREATE TABLE "Race" (
    "id_race" INTEGER NOT NULL,
    "id_race_type" INTEGER NOT NULL,
    "race_number" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "sunrise" TIMESTAMP(3) NOT NULL,
    "sunset" TIMESTAMP(3) NOT NULL,
    "is_closed" INTEGER NOT NULL,
    "weather" TEXT NOT NULL,
    "wind" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "arrival_weather" TEXT NOT NULL,
    "arrival_wind" TEXT NOT NULL,
    "arrival_temperature" TEXT NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id_race")
);

-- CreateTable
CREATE TABLE "RaceIgnoreBird" (
    "id_ignore_bird" INTEGER NOT NULL,
    "id_race" INTEGER NOT NULL,
    "id_event_inventory_item" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "RaceIgnoreBird_pkey" PRIMARY KEY ("id_ignore_bird")
);

-- CreateTable
CREATE TABLE "RaceItem" (
    "id_race_item" INTEGER NOT NULL,
    "id_race" INTEGER NOT NULL,
    "id_inventory_item" INTEGER NOT NULL,
    "id_dist_basket" INTEGER NOT NULL,
    "id_race_basket" INTEGER NOT NULL,
    "is_dist_basketed" INTEGER NOT NULL,
    "is_lost" INTEGER NOT NULL,
    "lost_id_race" INTEGER NOT NULL,
    "race_basket_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaceItem_pkey" PRIMARY KEY ("id_race_item")
);

-- CreateTable
CREATE TABLE "RaceItemResult" (
    "id_race_item" INTEGER NOT NULL,
    "bird_position" INTEGER NOT NULL,
    "bird_position_hot_spot" INTEGER NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "bird_drop" INTEGER NOT NULL,
    "prize_value" BIGINT NOT NULL,

    CONSTRAINT "RaceItemResult_pkey" PRIMARY KEY ("id_race_item")
);

-- CreateTable
CREATE TABLE "RaceItemScan" (
    "id_race" INTEGER NOT NULL,
    "id_race_item" INTEGER NOT NULL,
    "scan_pos" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "RaceNumberGroup" (
    "id_race_number_group" INTEGER NOT NULL,

    CONSTRAINT "RaceNumberGroup_pkey" PRIMARY KEY ("id_race_number_group")
);

-- CreateTable
CREATE TABLE "RacePhantomBird" (
    "id_race_phantom_bird" INTEGER NOT NULL,
    "id_race" INTEGER NOT NULL,
    "id_bird" INTEGER NOT NULL,
    "rf_id" TEXT NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "id_event" INTEGER NOT NULL,

    CONSTRAINT "RacePhantomBird_pkey" PRIMARY KEY ("id_race_phantom_bird")
);

-- CreateTable
CREATE TABLE "RaceType" (
    "id_race_type" INTEGER NOT NULL,
    "type_name" TEXT NOT NULL,
    "id_number_group" INTEGER NOT NULL,

    CONSTRAINT "RaceType_pkey" PRIMARY KEY ("id_race_type")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id_report" INTEGER NOT NULL,
    "ident" TEXT NOT NULL,
    "class_" TEXT NOT NULL,
    "fastreport_content" BYTEA NOT NULL,
    "default_caption" TEXT NOT NULL,
    "is_deleted" INTEGER NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id_report")
);

-- CreateTable
CREATE TABLE "ReportClasses" (
    "ident" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "copies" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ReportClasses_pkey" PRIMARY KEY ("ident")
);

-- CreateTable
CREATE TABLE "ReportIds" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "ReportIds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RightGroups" (
    "id_right_group" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RightGroups_pkey" PRIMARY KEY ("id_right_group")
);

-- CreateTable
CREATE TABLE "RightGroupLines" (
    "id_right_group_line" INTEGER NOT NULL,
    "id_right_group" INTEGER NOT NULL,
    "right_code" TEXT NOT NULL,
    "grant_level" INTEGER NOT NULL,

    CONSTRAINT "RightGroupLines_pkey" PRIMARY KEY ("id_right_group_line")
);

-- CreateTable
CREATE TABLE "StandardShowPercentage" (
    "id_standard_show_percentage" INTEGER NOT NULL,
    "id_betting_scheme" INTEGER NOT NULL,
    "place" INTEGER NOT NULL,
    "perc_value" BIGINT NOT NULL,

    CONSTRAINT "StandardShowPercentage_pkey" PRIMARY KEY ("id_standard_show_percentage")
);

-- CreateTable
CREATE TABLE "SystemCfg" (
    "cfg_key" TEXT NOT NULL,
    "cfg_value" TEXT NOT NULL,

    CONSTRAINT "SystemCfg_pkey" PRIMARY KEY ("cfg_key")
);

-- CreateTable
CREATE TABLE "SystemInfo" (
    "info_key" TEXT NOT NULL,
    "info_value" TEXT NOT NULL,

    CONSTRAINT "SystemInfo_pkey" PRIMARY KEY ("info_key")
);

-- CreateTable
CREATE TABLE "SystemRequirements" (
    "id_info_update" INTEGER NOT NULL,
    "module_name" TEXT NOT NULL,
    "required_version" TEXT NOT NULL,
    "id_system_update" INTEGER NOT NULL,

    CONSTRAINT "SystemRequirements_pkey" PRIMARY KEY ("id_info_update")
);

-- CreateTable
CREATE TABLE "SystemSession" (
    "session_key" TEXT NOT NULL,
    "session_value" TEXT NOT NULL,

    CONSTRAINT "SystemSession_pkey" PRIMARY KEY ("session_key")
);

-- CreateTable
CREATE TABLE "SystemUpdates" (
    "id_system_update" INTEGER NOT NULL,
    "patch_version" TEXT NOT NULL,
    "datetime_execution" TIMESTAMP(3) NOT NULL,
    "change_info" BYTEA NOT NULL,

    CONSTRAINT "SystemUpdates_pkey" PRIMARY KEY ("id_system_update")
);

-- CreateTable
CREATE TABLE "TmpAvgSpeed" (
    "id_event_inventory_item" INTEGER NOT NULL,
    "bird_position" INTEGER NOT NULL,
    "flight_time" BIGINT NOT NULL,
    "flight_distance" INTEGER NOT NULL,
    "avg_speed_in_yards" BIGINT NOT NULL,
    "avg_speed_in_miles" BIGINT NOT NULL,

    CONSTRAINT "TmpAvgSpeed_pkey" PRIMARY KEY ("id_event_inventory_item")
);

-- CreateTable
CREATE TABLE "TmpBets" (
    "id_race_item" INTEGER NOT NULL,
    "id_event_inventory_item" INTEGER NOT NULL,
    "bird_drop" INTEGER NOT NULL,
    "belgian_show_1" BIGINT NOT NULL,
    "belgian_show_2" BIGINT NOT NULL,
    "belgian_show_3" BIGINT NOT NULL,
    "belgian_show_4" BIGINT NOT NULL,
    "belgian_show_5" BIGINT NOT NULL,
    "belgian_show_6" BIGINT NOT NULL,
    "belgian_show_7" BIGINT NOT NULL,
    "standard_show_1" BIGINT NOT NULL,
    "standard_show_2" BIGINT NOT NULL,
    "standard_show_3" BIGINT NOT NULL,
    "standard_show_4" BIGINT NOT NULL,
    "standard_show_5" BIGINT NOT NULL,
    "standard_show_6" BIGINT NOT NULL,
    "wta_1" BIGINT NOT NULL,
    "wta_2" BIGINT NOT NULL,
    "wta_3" BIGINT NOT NULL,
    "wta_4" BIGINT NOT NULL,
    "wta_5" BIGINT NOT NULL,
    "total" BIGINT NOT NULL,
    "exec_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TmpBets_pkey" PRIMARY KEY ("id_race_item")
);

-- CreateTable
CREATE TABLE "TmpId" (
    "id" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "TmpId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id_user" INTEGER NOT NULL,
    "login_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" INTEGER NOT NULL,
    "email_address" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "UserRightGroups" (
    "id_user_right_group" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_right_group" INTEGER NOT NULL,

    CONSTRAINT "UserRightGroups_pkey" PRIMARY KEY ("id_user_right_group")
);

-- CreateIndex
CREATE UNIQUE INDEX "LogUserLoggedin_id_log_id_user_key" ON "LogUserLoggedin"("id_log", "id_user");

-- CreateIndex
CREATE UNIQUE INDEX "LogUserLoggedout_id_log_id_logged_in_key" ON "LogUserLoggedout"("id_log", "id_logged_in");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_id_event_inventory_id_breeder_key" ON "Partners"("id_event_inventory", "id_breeder");

-- CreateIndex
CREATE UNIQUE INDEX "RaceItemScan_id_race_id_race_item_key" ON "RaceItemScan"("id_race", "id_race_item");
