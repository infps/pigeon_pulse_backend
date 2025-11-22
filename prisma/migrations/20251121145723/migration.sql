/*
  Warnings:

  - The primary key for the `AvgWinnerPrizes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_event` on the `AvgWinnerPrizes` table. All the data in the column will be lost.
  - You are about to drop the column `id_event_inventory_item` on the `AvgWinnerPrizes` table. All the data in the column will be lost.
  - You are about to drop the column `prize_value` on the `AvgWinnerPrizes` table. All the data in the column will be lost.
  - The primary key for the `Basket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `basket_no` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `id_basket` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `id_race` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `is_race_basket` on the `Basket` table. All the data in the column will be lost.
  - The primary key for the `BettingScheme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `belgian_show_1` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_2` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_3` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_4` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_5` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_6` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_7` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `betting_cut_percent` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `betting_scheme_name` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `id_betting_scheme` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_1` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_2` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_3` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_4` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_5` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_6` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `wta_1` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `wta_2` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `wta_3` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `wta_4` on the `BettingScheme` table. All the data in the column will be lost.
  - You are about to drop the column `wta_5` on the `BettingScheme` table. All the data in the column will be lost.
  - The primary key for the `Birds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `band` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `band_1` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `band_2` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `band_3` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `band_4` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `bird_name` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `id_bird` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `id_picture` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `is_lost` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `is_race_verified` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `lost_date` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `lost_id_race` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `play_attention_sound` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `rf_id` on the `Birds` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Birds` table. All the data in the column will be lost.
  - The primary key for the `BirdsView` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `band` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `band_1` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `band_2` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `band_3` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `band_4` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `bird_name` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `id_bird` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `id_picture` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `is_lost` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `is_race_verified` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `lost_date` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `lost_id_race` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `play_attention_sound` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `rf_id` on the `BirdsView` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `BirdsView` table. All the data in the column will be lost.
  - The primary key for the `Breeders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address_1` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `address_2` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `cell` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `city_1` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `city_2` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `def_name_agn` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `def_name_as` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `email_2` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `fax` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `id_breeder` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `id_picture` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `is_default_address_1` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `login_name` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `login_password` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `sms` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `social_security_number` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `state_1` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `state_2` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `status_date` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `tax_number` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `web_address` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `zip_1` on the `Breeders` table. All the data in the column will be lost.
  - You are about to drop the column `zip_2` on the `Breeders` table. All the data in the column will be lost.
  - The primary key for the `DatasyncSys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dsext_ver` on the `DatasyncSys` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `DatasyncSys` table. All the data in the column will be lost.
  - The primary key for the `DatasyncWeb` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dboperation` on the `DatasyncWeb` table. All the data in the column will be lost.
  - You are about to drop the column `dbtable` on the `DatasyncWeb` table. All the data in the column will be lost.
  - You are about to drop the column `dbtableidcolname` on the `DatasyncWeb` table. All the data in the column will be lost.
  - You are about to drop the column `dbtablerow` on the `DatasyncWeb` table. All the data in the column will be lost.
  - You are about to drop the column `dbtablerowid` on the `DatasyncWeb` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `DatasyncWeb` table. All the data in the column will be lost.
  - You are about to drop the column `processed` on the `DatasyncWeb` table. All the data in the column will be lost.
  - The primary key for the `EventInventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_breeder` on the `EventInventory` table. All the data in the column will be lost.
  - You are about to drop the column `id_event` on the `EventInventory` table. All the data in the column will be lost.
  - You are about to drop the column `id_event_inventory` on the `EventInventory` table. All the data in the column will be lost.
  - You are about to drop the column `is_waiting` on the `EventInventory` table. All the data in the column will be lost.
  - You are about to drop the column `loft` on the `EventInventory` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `EventInventory` table. All the data in the column will be lost.
  - You are about to drop the column `reserved_birds` on the `EventInventory` table. All the data in the column will be lost.
  - You are about to drop the column `sign_in_date` on the `EventInventory` table. All the data in the column will be lost.
  - You are about to drop the column `waiting_date` on the `EventInventory` table. All the data in the column will be lost.
  - The primary key for the `EventInventoryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `arrival_date` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_bet_1` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_bet_2` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_bet_3` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_bet_4` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_bet_5` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_bet_6` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_bet_7` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `bets_refund` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `bird_no` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `departure_date` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `entry_fee_paid` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `entry_fee_value` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `entry_refund` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `hot_spot_fee_value` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `hot_spot_refund` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_bird` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_event_inventory` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_event_inventory_item` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_replaced_item` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `is_backup` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `is_bet_active` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `perch_fee_value` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_bet_1` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_bet_2` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_bet_3` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_bet_4` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_bet_5` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_bet_6` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `transfer_due` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `wta_bet_1` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `wta_bet_2` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `wta_bet_3` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `wta_bet_4` on the `EventInventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `wta_bet_5` on the `EventInventoryItem` table. All the data in the column will be lost.
  - The primary key for the `EventRaceNumber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_event` on the `EventRaceNumber` table. All the data in the column will be lost.
  - You are about to drop the column `id_number_group` on the `EventRaceNumber` table. All the data in the column will be lost.
  - You are about to drop the column `number_range_from` on the `EventRaceNumber` table. All the data in the column will be lost.
  - You are about to drop the column `number_range_to` on the `EventRaceNumber` table. All the data in the column will be lost.
  - The primary key for the `Events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_date` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `event_name` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `event_short_name` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `event_type` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `id_betting_scheme` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `id_event` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `id_fee_scheme` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `id_final_prize_scheme` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `id_hot_spot1_prize_scheme` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `id_hot_spot2_prize_scheme` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `id_hot_spot3_prize_scheme` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `id_hot_spot_avg_prize_scheme` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `is_open` on the `Events` table. All the data in the column will be lost.
  - The primary key for the `FeeScheme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `entry_fee` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `fee_scheme_name` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `fees_cut_percent` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `hot_spot1_fee` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `hot_spot2_fee` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `hot_spot3_fee` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `hot_spot_final_fee` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `id_fee_scheme` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `is_floating_backup` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `is_refundable` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `max_backup_bird_count` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `max_bird_count` on the `FeeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `min_entry_fees` on the `FeeScheme` table. All the data in the column will be lost.
  - The primary key for the `IbeLogBlobFields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `field_name` on the `IbeLogBlobFields` table. All the data in the column will be lost.
  - You are about to drop the column `log_tables_id` on the `IbeLogBlobFields` table. All the data in the column will be lost.
  - You are about to drop the column `new_blob_value` on the `IbeLogBlobFields` table. All the data in the column will be lost.
  - You are about to drop the column `new_char_value` on the `IbeLogBlobFields` table. All the data in the column will be lost.
  - You are about to drop the column `old_blob_value` on the `IbeLogBlobFields` table. All the data in the column will be lost.
  - You are about to drop the column `old_char_value` on the `IbeLogBlobFields` table. All the data in the column will be lost.
  - The primary key for the `IbeLogFields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `field_name` on the `IbeLogFields` table. All the data in the column will be lost.
  - You are about to drop the column `log_tables_id` on the `IbeLogFields` table. All the data in the column will be lost.
  - You are about to drop the column `new_value` on the `IbeLogFields` table. All the data in the column will be lost.
  - You are about to drop the column `old_value` on the `IbeLogFields` table. All the data in the column will be lost.
  - The primary key for the `IbeLogKeys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key_field` on the `IbeLogKeys` table. All the data in the column will be lost.
  - You are about to drop the column `key_value` on the `IbeLogKeys` table. All the data in the column will be lost.
  - You are about to drop the column `log_tables_id` on the `IbeLogKeys` table. All the data in the column will be lost.
  - The primary key for the `IbeLogTables` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date_time` on the `IbeLogTables` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `IbeLogTables` table. All the data in the column will be lost.
  - You are about to drop the column `operation` on the `IbeLogTables` table. All the data in the column will be lost.
  - You are about to drop the column `table_name` on the `IbeLogTables` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `IbeLogTables` table. All the data in the column will be lost.
  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `dt_logged` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `id_log` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `log_level` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `machine` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `id_log` on the `LogUserLoggedin` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `LogUserLoggedin` table. All the data in the column will be lost.
  - You are about to drop the column `id_log` on the `LogUserLoggedout` table. All the data in the column will be lost.
  - You are about to drop the column `id_logged_in` on the `LogUserLoggedout` table. All the data in the column will be lost.
  - The primary key for the `LostHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_bird` on the `LostHistory` table. All the data in the column will be lost.
  - You are about to drop the column `id_lost_history` on the `LostHistory` table. All the data in the column will be lost.
  - You are about to drop the column `id_race` on the `LostHistory` table. All the data in the column will be lost.
  - You are about to drop the column `is_lost` on the `LostHistory` table. All the data in the column will be lost.
  - You are about to drop the column `lost_date` on the `LostHistory` table. All the data in the column will be lost.
  - The primary key for the `OrganizerData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `cell` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `fax` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `web` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `OrganizerData` table. All the data in the column will be lost.
  - You are about to drop the column `id_breeder` on the `Partners` table. All the data in the column will be lost.
  - You are about to drop the column `id_event_inventory` on the `Partners` table. All the data in the column will be lost.
  - The primary key for the `Payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_event_inventory` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `id_payment` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `id_picture` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_date` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_desc` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_timestamp` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_value` on the `Payments` table. All the data in the column will be lost.
  - The primary key for the `PerchFeeItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bird_no` on the `PerchFeeItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_fee_scheme` on the `PerchFeeItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_perch_fee_item` on the `PerchFeeItem` table. All the data in the column will be lost.
  - You are about to drop the column `perch_fee` on the `PerchFeeItem` table. All the data in the column will be lost.
  - The primary key for the `Picture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_picture` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `picture_layout` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `picture_type` on the `Picture` table. All the data in the column will be lost.
  - The primary key for the `PrizeScheme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_prize_scheme` on the `PrizeScheme` table. All the data in the column will be lost.
  - You are about to drop the column `prize_name` on the `PrizeScheme` table. All the data in the column will be lost.
  - The primary key for the `PrizeSchemeItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `from_position` on the `PrizeSchemeItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_prize_scheme` on the `PrizeSchemeItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_prize_scheme_item` on the `PrizeSchemeItem` table. All the data in the column will be lost.
  - You are about to drop the column `prize_value` on the `PrizeSchemeItem` table. All the data in the column will be lost.
  - You are about to drop the column `to_position` on the `PrizeSchemeItem` table. All the data in the column will be lost.
  - The primary key for the `PrizeValue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_event` on the `PrizeValue` table. All the data in the column will be lost.
  - You are about to drop the column `id_prize_scheme_item` on the `PrizeValue` table. All the data in the column will be lost.
  - You are about to drop the column `id_prize_value` on the `PrizeValue` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_type` on the `PrizeValue` table. All the data in the column will be lost.
  - You are about to drop the column `prize_value` on the `PrizeValue` table. All the data in the column will be lost.
  - The primary key for the `Race` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `arrival_temperature` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `arrival_weather` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `arrival_wind` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `id_event` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `id_race` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_type` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `is_closed` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `race_number` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `sunrise` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `sunset` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `weather` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `wind` on the `Race` table. All the data in the column will be lost.
  - The primary key for the `RaceIgnoreBird` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_event_inventory_item` on the `RaceIgnoreBird` table. All the data in the column will be lost.
  - You are about to drop the column `id_ignore_bird` on the `RaceIgnoreBird` table. All the data in the column will be lost.
  - You are about to drop the column `id_race` on the `RaceIgnoreBird` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `RaceIgnoreBird` table. All the data in the column will be lost.
  - The primary key for the `RaceItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_dist_basket` on the `RaceItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_inventory_item` on the `RaceItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_race` on the `RaceItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_basket` on the `RaceItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_item` on the `RaceItem` table. All the data in the column will be lost.
  - You are about to drop the column `is_dist_basketed` on the `RaceItem` table. All the data in the column will be lost.
  - You are about to drop the column `is_lost` on the `RaceItem` table. All the data in the column will be lost.
  - You are about to drop the column `lost_id_race` on the `RaceItem` table. All the data in the column will be lost.
  - You are about to drop the column `race_basket_time` on the `RaceItem` table. All the data in the column will be lost.
  - The primary key for the `RaceItemResult` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `arrival_time` on the `RaceItemResult` table. All the data in the column will be lost.
  - You are about to drop the column `bird_drop` on the `RaceItemResult` table. All the data in the column will be lost.
  - You are about to drop the column `bird_position` on the `RaceItemResult` table. All the data in the column will be lost.
  - You are about to drop the column `bird_position_hot_spot` on the `RaceItemResult` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_item` on the `RaceItemResult` table. All the data in the column will be lost.
  - You are about to drop the column `prize_value` on the `RaceItemResult` table. All the data in the column will be lost.
  - You are about to drop the column `id_race` on the `RaceItemScan` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_item` on the `RaceItemScan` table. All the data in the column will be lost.
  - You are about to drop the column `scan_pos` on the `RaceItemScan` table. All the data in the column will be lost.
  - The primary key for the `RaceNumberGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_race_number_group` on the `RaceNumberGroup` table. All the data in the column will be lost.
  - The primary key for the `RacePhantomBird` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `arrival_time` on the `RacePhantomBird` table. All the data in the column will be lost.
  - You are about to drop the column `id_bird` on the `RacePhantomBird` table. All the data in the column will be lost.
  - You are about to drop the column `id_event` on the `RacePhantomBird` table. All the data in the column will be lost.
  - You are about to drop the column `id_race` on the `RacePhantomBird` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_phantom_bird` on the `RacePhantomBird` table. All the data in the column will be lost.
  - You are about to drop the column `rf_id` on the `RacePhantomBird` table. All the data in the column will be lost.
  - The primary key for the `RaceType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_number_group` on the `RaceType` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_type` on the `RaceType` table. All the data in the column will be lost.
  - You are about to drop the column `type_name` on the `RaceType` table. All the data in the column will be lost.
  - The primary key for the `ReportClasses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `caption` on the `ReportClasses` table. All the data in the column will be lost.
  - You are about to drop the column `copies` on the `ReportClasses` table. All the data in the column will be lost.
  - You are about to drop the column `ident` on the `ReportClasses` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ReportClasses` table. All the data in the column will be lost.
  - The primary key for the `ReportIds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ReportIds` table. All the data in the column will be lost.
  - The primary key for the `Reports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class_` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the column `default_caption` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the column `fastreport_content` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the column `id_report` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the column `ident` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Reports` table. All the data in the column will be lost.
  - The primary key for the `RightGroupLines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `grant_level` on the `RightGroupLines` table. All the data in the column will be lost.
  - You are about to drop the column `id_right_group` on the `RightGroupLines` table. All the data in the column will be lost.
  - You are about to drop the column `id_right_group_line` on the `RightGroupLines` table. All the data in the column will be lost.
  - You are about to drop the column `right_code` on the `RightGroupLines` table. All the data in the column will be lost.
  - The primary key for the `RightGroups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_right_group` on the `RightGroups` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `RightGroups` table. All the data in the column will be lost.
  - The primary key for the `StandardShowPercentage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_betting_scheme` on the `StandardShowPercentage` table. All the data in the column will be lost.
  - You are about to drop the column `id_standard_show_percentage` on the `StandardShowPercentage` table. All the data in the column will be lost.
  - You are about to drop the column `perc_value` on the `StandardShowPercentage` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `StandardShowPercentage` table. All the data in the column will be lost.
  - The primary key for the `SystemCfg` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cfg_key` on the `SystemCfg` table. All the data in the column will be lost.
  - You are about to drop the column `cfg_value` on the `SystemCfg` table. All the data in the column will be lost.
  - The primary key for the `SystemInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `info_key` on the `SystemInfo` table. All the data in the column will be lost.
  - You are about to drop the column `info_value` on the `SystemInfo` table. All the data in the column will be lost.
  - The primary key for the `SystemRequirements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_info_update` on the `SystemRequirements` table. All the data in the column will be lost.
  - You are about to drop the column `id_system_update` on the `SystemRequirements` table. All the data in the column will be lost.
  - You are about to drop the column `module_name` on the `SystemRequirements` table. All the data in the column will be lost.
  - You are about to drop the column `required_version` on the `SystemRequirements` table. All the data in the column will be lost.
  - The primary key for the `SystemSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `session_key` on the `SystemSession` table. All the data in the column will be lost.
  - You are about to drop the column `session_value` on the `SystemSession` table. All the data in the column will be lost.
  - The primary key for the `SystemUpdates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `change_info` on the `SystemUpdates` table. All the data in the column will be lost.
  - You are about to drop the column `datetime_execution` on the `SystemUpdates` table. All the data in the column will be lost.
  - You are about to drop the column `id_system_update` on the `SystemUpdates` table. All the data in the column will be lost.
  - You are about to drop the column `patch_version` on the `SystemUpdates` table. All the data in the column will be lost.
  - The primary key for the `TmpAvgSpeed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avg_speed_in_miles` on the `TmpAvgSpeed` table. All the data in the column will be lost.
  - You are about to drop the column `avg_speed_in_yards` on the `TmpAvgSpeed` table. All the data in the column will be lost.
  - You are about to drop the column `bird_position` on the `TmpAvgSpeed` table. All the data in the column will be lost.
  - You are about to drop the column `flight_distance` on the `TmpAvgSpeed` table. All the data in the column will be lost.
  - You are about to drop the column `flight_time` on the `TmpAvgSpeed` table. All the data in the column will be lost.
  - You are about to drop the column `id_event_inventory_item` on the `TmpAvgSpeed` table. All the data in the column will be lost.
  - The primary key for the `TmpBets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `belgian_show_1` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_2` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_3` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_4` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_5` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_6` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `belgian_show_7` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `bird_drop` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `exec_time` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `id_event_inventory_item` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `id_race_item` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_1` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_2` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_3` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_4` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_5` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `standard_show_6` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `wta_1` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `wta_2` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `wta_3` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `wta_4` on the `TmpBets` table. All the data in the column will be lost.
  - You are about to drop the column `wta_5` on the `TmpBets` table. All the data in the column will be lost.
  - The primary key for the `TmpId` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TmpId` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `TmpId` table. All the data in the column will be lost.
  - The primary key for the `UserRightGroups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_right_group` on the `UserRightGroups` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `UserRightGroups` table. All the data in the column will be lost.
  - You are about to drop the column `id_user_right_group` on the `UserRightGroups` table. All the data in the column will be lost.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_address` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `login_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ID_LOG,ID_USER]` on the table `LogUserLoggedin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ID_LOG,ID_LOGGED_IN]` on the table `LogUserLoggedout` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ID_EVENT_INVENTORY,ID_BREEDER]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ID_RACE,ID_RACE_ITEM]` on the table `RaceItemScan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ID_EVENT` to the `AvgWinnerPrizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY_ITEM` to the `AvgWinnerPrizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRIZE_VALUE` to the `AvgWinnerPrizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BASKET_NO` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CAPACITY` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BASKET` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_RACE_BASKET` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_1` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_2` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_3` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_4` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_5` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_6` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_7` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BETTING_CUT_PERCENT` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BETTING_SCHEME_NAME` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BETTING_SCHEME` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_1` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_2` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_3` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_4` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_5` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_6` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_1` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_2` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_3` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_4` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_5` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND_1` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND_2` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND_3` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND_4` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_NAME` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `COLOR` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BIRD` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PICTURE` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_ACTIVE` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_LOST` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_RACE_VERIFIED` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOST_DATE` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOST_ID_RACE` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NOTE` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PLAY_ATTENTION_SOUND` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RF_ID` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SEX` to the `Birds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND_1` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND_2` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND_3` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BAND_4` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_NAME` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `COLOR` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BIRD` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PICTURE` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_ACTIVE` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_LOST` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_RACE_VERIFIED` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOST_DATE` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOST_ID_RACE` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NOTE` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PLAY_ATTENTION_SOUND` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RF_ID` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SEX` to the `BirdsView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ADDRESS_1` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ADDRESS_2` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CELL` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CITY_1` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CITY_2` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `COUNTRY` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DEF_NAME_AGN` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DEF_NAME_AS` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EMAIL` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EMAIL_2` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FAX` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FIRST_NAME` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BREEDER` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PICTURE` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_DEFAULT_ADDRESS_1` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LAST_NAME` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOGIN_NAME` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOGIN_PASSWORD` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NOTE` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NUMBER` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PHONE` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SMS` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SOCIAL_SECURITY_NUMBER` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STATE_1` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STATE_2` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STATUS` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STATUS_DATE` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TAX_NUMBER` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WEB_ADDRESS` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ZIP_1` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ZIP_2` to the `Breeders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DSEXT_VER` to the `DatasyncSys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID` to the `DatasyncSys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DBOPERATION` to the `DatasyncWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DBTABLE` to the `DatasyncWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DBTABLEIDCOLNAME` to the `DatasyncWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DBTABLEROW` to the `DatasyncWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DBTABLEROWID` to the `DatasyncWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID` to the `DatasyncWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PROCESSED` to the `DatasyncWeb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BREEDER` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_WAITING` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOFT` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NOTE` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RESERVED_BIRDS` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SIGN_IN_DATE` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WAITING_DATE` to the `EventInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ARRIVAL_DATE` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_BET_1` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_BET_2` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_BET_3` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_BET_4` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_BET_5` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_BET_6` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_BET_7` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BETS_REFUND` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_NO` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DEPARTURE_DATE` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ENTRY_FEE_PAID` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ENTRY_FEE_VALUE` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ENTRY_REFUND` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HOT_SPOT_FEE_VALUE` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HOT_SPOT_REFUND` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BIRD` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY_ITEM` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_REPLACED_ITEM` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_BACKUP` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_BET_ACTIVE` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PERCH_FEE_VALUE` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_BET_1` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_BET_2` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_BET_3` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_BET_4` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_BET_5` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_BET_6` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TRANSFER_DUE` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_BET_1` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_BET_2` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_BET_3` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_BET_4` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_BET_5` to the `EventInventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT` to the `EventRaceNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_NUMBER_GROUP` to the `EventRaceNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NUMBER_RANGE_FROM` to the `EventRaceNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NUMBER_RANGE_TO` to the `EventRaceNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EVENT_DATE` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EVENT_NAME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EVENT_SHORT_NAME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EVENT_TYPE` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BETTING_SCHEME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_FEE_SCHEME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_FINAL_PRIZE_SCHEME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_HOT_SPOT1_PRIZE_SCHEME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_HOT_SPOT2_PRIZE_SCHEME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_HOT_SPOT3_PRIZE_SCHEME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_HOT_SPOT_AVG_PRIZE_SCHEME` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_OPEN` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ENTRY_FEE` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FEES_CUT_PERCENT` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FEE_SCHEME_NAME` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HOT_SPOT1_FEE` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HOT_SPOT2_FEE` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HOT_SPOT3_FEE` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HOT_SPOT_FINAL_FEE` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_FEE_SCHEME` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_FLOATING_BACKUP` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_REFUNDABLE` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MAX_BACKUP_BIRD_COUNT` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MAX_BIRD_COUNT` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MIN_ENTRY_FEES` to the `FeeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FIELD_NAME` to the `IbeLogBlobFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOG_TABLES_ID` to the `IbeLogBlobFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NEW_BLOB_VALUE` to the `IbeLogBlobFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NEW_CHAR_VALUE` to the `IbeLogBlobFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OLD_BLOB_VALUE` to the `IbeLogBlobFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OLD_CHAR_VALUE` to the `IbeLogBlobFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FIELD_NAME` to the `IbeLogFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOG_TABLES_ID` to the `IbeLogFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NEW_VALUE` to the `IbeLogFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OLD_VALUE` to the `IbeLogFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KEY_FIELD` to the `IbeLogKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KEY_VALUE` to the `IbeLogKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOG_TABLES_ID` to the `IbeLogKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DATE_TIME` to the `IbeLogTables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID` to the `IbeLogTables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OPERATION` to the `IbeLogTables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TABLE_NAME` to the `IbeLogTables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `USER_NAME` to the `IbeLogTables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CATEGORY` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CONTENT` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DT_LOGGED` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_LOG` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_USER` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOG_LEVEL` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MACHINE` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_LOG` to the `LogUserLoggedin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_USER` to the `LogUserLoggedin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_LOG` to the `LogUserLoggedout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_LOGGED_IN` to the `LogUserLoggedout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BIRD` to the `LostHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_LOST_HISTORY` to the `LostHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE` to the `LostHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_LOST` to the `LostHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOST_DATE` to the `LostHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ADDRESS` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CELL` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CITY` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EMAIL` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FAX` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NAME` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NOTE` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PHONE` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STATE` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WEB` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ZIP` to the `OrganizerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BREEDER` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PAYMENT` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PICTURE` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PAYMENT_DATE` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PAYMENT_DESC` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PAYMENT_METHOD` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PAYMENT_TIMESTAMP` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PAYMENT_TYPE` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PAYMENT_VALUE` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_NO` to the `PerchFeeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_FEE_SCHEME` to the `PerchFeeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PERCH_FEE_ITEM` to the `PerchFeeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PERCH_FEE` to the `PerchFeeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PICTURE` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PICTURE` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PICTURE_LAYOUT` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PICTURE_TYPE` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PRIZE_SCHEME` to the `PrizeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRIZE_NAME` to the `PrizeScheme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FROM_POSITION` to the `PrizeSchemeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PRIZE_SCHEME` to the `PrizeSchemeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PRIZE_SCHEME_ITEM` to the `PrizeSchemeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRIZE_VALUE` to the `PrizeSchemeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TO_POSITION` to the `PrizeSchemeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT` to the `PrizeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PRIZE_SCHEME_ITEM` to the `PrizeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_PRIZE_VALUE` to the `PrizeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_TYPE` to the `PrizeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRIZE_VALUE` to the `PrizeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ARRIVAL_TEMPERATURE` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ARRIVAL_WEATHER` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ARRIVAL_WIND` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DESCRIPTION` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DISTANCE` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `END_TIME` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_TYPE` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_CLOSED` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOCATION` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RACE_NUMBER` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `START_TIME` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SUNRISE` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SUNSET` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TEMPERATURE` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WEATHER` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WIND` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY_ITEM` to the `RaceIgnoreBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_IGNORE_BIRD` to the `RaceIgnoreBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE` to the `RaceIgnoreBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NOTE` to the `RaceIgnoreBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_DIST_BASKET` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_INVENTORY_ITEM` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_BASKET` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_ITEM` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_DIST_BASKETED` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_LOST` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOST_ID_RACE` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RACE_BASKET_TIME` to the `RaceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ARRIVAL_TIME` to the `RaceItemResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_DROP` to the `RaceItemResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_POSITION` to the `RaceItemResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_POSITION_HOT_SPOT` to the `RaceItemResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_ITEM` to the `RaceItemResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRIZE_VALUE` to the `RaceItemResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE` to the `RaceItemScan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_ITEM` to the `RaceItemScan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SCAN_POS` to the `RaceItemScan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_NUMBER_GROUP` to the `RaceNumberGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ARRIVAL_TIME` to the `RacePhantomBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BIRD` to the `RacePhantomBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT` to the `RacePhantomBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE` to the `RacePhantomBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_PHANTOM_BIRD` to the `RacePhantomBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RF_ID` to the `RacePhantomBird` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_NUMBER_GROUP` to the `RaceType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_TYPE` to the `RaceType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TYPE_NAME` to the `RaceType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CAPTION` to the `ReportClasses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `COPIES` to the `ReportClasses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IDENT` to the `ReportClasses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TYPE` to the `ReportClasses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID` to the `ReportIds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CLASS_` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DEFAULT_CAPTION` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FASTREPORT_CONTENT` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IDENT` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_REPORT` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_DELETED` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GRANT_LEVEL` to the `RightGroupLines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RIGHT_GROUP` to the `RightGroupLines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RIGHT_GROUP_LINE` to the `RightGroupLines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RIGHT_CODE` to the `RightGroupLines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RIGHT_GROUP` to the `RightGroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NAME` to the `RightGroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_BETTING_SCHEME` to the `StandardShowPercentage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_STANDARD_SHOW_PERCENTAGE` to the `StandardShowPercentage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PERC_VALUE` to the `StandardShowPercentage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PLACE` to the `StandardShowPercentage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CFG_KEY` to the `SystemCfg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CFG_VALUE` to the `SystemCfg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `INFO_KEY` to the `SystemInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `INFO_VALUE` to the `SystemInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_INFO_UPDATE` to the `SystemRequirements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_SYSTEM_UPDATE` to the `SystemRequirements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MODULE_NAME` to the `SystemRequirements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `REQUIRED_VERSION` to the `SystemRequirements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SESSION_KEY` to the `SystemSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SESSION_VALUE` to the `SystemSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CHANGE_INFO` to the `SystemUpdates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DATETIME_EXECUTION` to the `SystemUpdates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_SYSTEM_UPDATE` to the `SystemUpdates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PATCH_VERSION` to the `SystemUpdates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AVG_SPEED_IN_MILES` to the `TmpAvgSpeed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AVG_SPEED_IN_YARDS` to the `TmpAvgSpeed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_POSITION` to the `TmpAvgSpeed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FLIGHT_DISTANCE` to the `TmpAvgSpeed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FLIGHT_TIME` to the `TmpAvgSpeed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY_ITEM` to the `TmpAvgSpeed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_1` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_2` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_3` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_4` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_5` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_6` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BELGIAN_SHOW_7` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BIRD_DROP` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EXEC_TIME` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_EVENT_INVENTORY_ITEM` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RACE_ITEM` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_1` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_2` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_3` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_4` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_5` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STANDARD_SHOW_6` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TOTAL` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_1` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_2` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_3` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_4` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WTA_5` to the `TmpBets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID` to the `TmpId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TAG` to the `TmpId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_RIGHT_GROUP` to the `UserRightGroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_USER` to the `UserRightGroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_USER_RIGHT_GROUP` to the `UserRightGroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EMAIL_ADDRESS` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FULL_NAME` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_USER` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IS_ACTIVE` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOGIN_NAME` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PASSWORD` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LogUserLoggedin_id_log_id_user_key";

-- DropIndex
DROP INDEX "LogUserLoggedout_id_log_id_logged_in_key";

-- DropIndex
DROP INDEX "Partners_id_event_inventory_id_breeder_key";

-- DropIndex
DROP INDEX "RaceItemScan_id_race_id_race_item_key";

-- AlterTable
ALTER TABLE "AvgWinnerPrizes" DROP CONSTRAINT "AvgWinnerPrizes_pkey",
DROP COLUMN "id_event",
DROP COLUMN "id_event_inventory_item",
DROP COLUMN "prize_value",
ADD COLUMN     "ID_EVENT" INTEGER NOT NULL,
ADD COLUMN     "ID_EVENT_INVENTORY_ITEM" INTEGER NOT NULL,
ADD COLUMN     "PRIZE_VALUE" BIGINT NOT NULL,
ADD CONSTRAINT "AvgWinnerPrizes_pkey" PRIMARY KEY ("ID_EVENT_INVENTORY_ITEM");

-- AlterTable
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_pkey",
DROP COLUMN "basket_no",
DROP COLUMN "capacity",
DROP COLUMN "id_basket",
DROP COLUMN "id_race",
DROP COLUMN "is_race_basket",
ADD COLUMN     "BASKET_NO" INTEGER NOT NULL,
ADD COLUMN     "CAPACITY" INTEGER NOT NULL,
ADD COLUMN     "ID_BASKET" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "IS_RACE_BASKET" INTEGER NOT NULL,
ADD CONSTRAINT "Basket_pkey" PRIMARY KEY ("ID_BASKET");

-- AlterTable
ALTER TABLE "BettingScheme" DROP CONSTRAINT "BettingScheme_pkey",
DROP COLUMN "belgian_show_1",
DROP COLUMN "belgian_show_2",
DROP COLUMN "belgian_show_3",
DROP COLUMN "belgian_show_4",
DROP COLUMN "belgian_show_5",
DROP COLUMN "belgian_show_6",
DROP COLUMN "belgian_show_7",
DROP COLUMN "betting_cut_percent",
DROP COLUMN "betting_scheme_name",
DROP COLUMN "id_betting_scheme",
DROP COLUMN "standard_show_1",
DROP COLUMN "standard_show_2",
DROP COLUMN "standard_show_3",
DROP COLUMN "standard_show_4",
DROP COLUMN "standard_show_5",
DROP COLUMN "standard_show_6",
DROP COLUMN "wta_1",
DROP COLUMN "wta_2",
DROP COLUMN "wta_3",
DROP COLUMN "wta_4",
DROP COLUMN "wta_5",
ADD COLUMN     "BELGIAN_SHOW_1" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_2" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_3" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_4" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_5" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_6" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_7" BIGINT NOT NULL,
ADD COLUMN     "BETTING_CUT_PERCENT" BIGINT NOT NULL,
ADD COLUMN     "BETTING_SCHEME_NAME" TEXT NOT NULL,
ADD COLUMN     "ID_BETTING_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "STANDARD_SHOW_1" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_2" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_3" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_4" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_5" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_6" BIGINT NOT NULL,
ADD COLUMN     "WTA_1" BIGINT NOT NULL,
ADD COLUMN     "WTA_2" BIGINT NOT NULL,
ADD COLUMN     "WTA_3" BIGINT NOT NULL,
ADD COLUMN     "WTA_4" BIGINT NOT NULL,
ADD COLUMN     "WTA_5" BIGINT NOT NULL,
ADD CONSTRAINT "BettingScheme_pkey" PRIMARY KEY ("ID_BETTING_SCHEME");

-- AlterTable
ALTER TABLE "Birds" DROP CONSTRAINT "Birds_pkey",
DROP COLUMN "band",
DROP COLUMN "band_1",
DROP COLUMN "band_2",
DROP COLUMN "band_3",
DROP COLUMN "band_4",
DROP COLUMN "bird_name",
DROP COLUMN "color",
DROP COLUMN "id_bird",
DROP COLUMN "id_picture",
DROP COLUMN "is_active",
DROP COLUMN "is_lost",
DROP COLUMN "is_race_verified",
DROP COLUMN "lost_date",
DROP COLUMN "lost_id_race",
DROP COLUMN "note",
DROP COLUMN "play_attention_sound",
DROP COLUMN "rf_id",
DROP COLUMN "sex",
ADD COLUMN     "BAND" TEXT NOT NULL,
ADD COLUMN     "BAND_1" TEXT NOT NULL,
ADD COLUMN     "BAND_2" TEXT NOT NULL,
ADD COLUMN     "BAND_3" TEXT NOT NULL,
ADD COLUMN     "BAND_4" TEXT NOT NULL,
ADD COLUMN     "BIRD_NAME" TEXT NOT NULL,
ADD COLUMN     "COLOR" TEXT NOT NULL,
ADD COLUMN     "ID_BIRD" INTEGER NOT NULL,
ADD COLUMN     "ID_PICTURE" INTEGER NOT NULL,
ADD COLUMN     "IS_ACTIVE" INTEGER NOT NULL,
ADD COLUMN     "IS_LOST" INTEGER NOT NULL,
ADD COLUMN     "IS_RACE_VERIFIED" INTEGER NOT NULL,
ADD COLUMN     "LOST_DATE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "LOST_ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "NOTE" TEXT NOT NULL,
ADD COLUMN     "PLAY_ATTENTION_SOUND" INTEGER NOT NULL,
ADD COLUMN     "RF_ID" TEXT NOT NULL,
ADD COLUMN     "SEX" INTEGER NOT NULL,
ADD CONSTRAINT "Birds_pkey" PRIMARY KEY ("ID_BIRD");

-- AlterTable
ALTER TABLE "BirdsView" DROP CONSTRAINT "BirdsView_pkey",
DROP COLUMN "band",
DROP COLUMN "band_1",
DROP COLUMN "band_2",
DROP COLUMN "band_3",
DROP COLUMN "band_4",
DROP COLUMN "bird_name",
DROP COLUMN "color",
DROP COLUMN "id_bird",
DROP COLUMN "id_picture",
DROP COLUMN "is_active",
DROP COLUMN "is_lost",
DROP COLUMN "is_race_verified",
DROP COLUMN "lost_date",
DROP COLUMN "lost_id_race",
DROP COLUMN "note",
DROP COLUMN "play_attention_sound",
DROP COLUMN "rf_id",
DROP COLUMN "sex",
ADD COLUMN     "BAND" TEXT NOT NULL,
ADD COLUMN     "BAND_1" TEXT NOT NULL,
ADD COLUMN     "BAND_2" TEXT NOT NULL,
ADD COLUMN     "BAND_3" TEXT NOT NULL,
ADD COLUMN     "BAND_4" TEXT NOT NULL,
ADD COLUMN     "BIRD_NAME" TEXT NOT NULL,
ADD COLUMN     "COLOR" TEXT NOT NULL,
ADD COLUMN     "ID_BIRD" INTEGER NOT NULL,
ADD COLUMN     "ID_PICTURE" INTEGER NOT NULL,
ADD COLUMN     "IS_ACTIVE" INTEGER NOT NULL,
ADD COLUMN     "IS_LOST" INTEGER NOT NULL,
ADD COLUMN     "IS_RACE_VERIFIED" INTEGER NOT NULL,
ADD COLUMN     "LOST_DATE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "LOST_ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "NOTE" TEXT NOT NULL,
ADD COLUMN     "PLAY_ATTENTION_SOUND" INTEGER NOT NULL,
ADD COLUMN     "RF_ID" TEXT NOT NULL,
ADD COLUMN     "SEX" INTEGER NOT NULL,
ADD CONSTRAINT "BirdsView_pkey" PRIMARY KEY ("ID_BIRD");

-- AlterTable
ALTER TABLE "Breeders" DROP CONSTRAINT "Breeders_pkey",
DROP COLUMN "address_1",
DROP COLUMN "address_2",
DROP COLUMN "cell",
DROP COLUMN "city_1",
DROP COLUMN "city_2",
DROP COLUMN "country",
DROP COLUMN "def_name_agn",
DROP COLUMN "def_name_as",
DROP COLUMN "email",
DROP COLUMN "email_2",
DROP COLUMN "fax",
DROP COLUMN "first_name",
DROP COLUMN "id_breeder",
DROP COLUMN "id_picture",
DROP COLUMN "is_default_address_1",
DROP COLUMN "last_name",
DROP COLUMN "login_name",
DROP COLUMN "login_password",
DROP COLUMN "note",
DROP COLUMN "number",
DROP COLUMN "phone",
DROP COLUMN "sms",
DROP COLUMN "social_security_number",
DROP COLUMN "state_1",
DROP COLUMN "state_2",
DROP COLUMN "status",
DROP COLUMN "status_date",
DROP COLUMN "tax_number",
DROP COLUMN "web_address",
DROP COLUMN "zip_1",
DROP COLUMN "zip_2",
ADD COLUMN     "ADDRESS_1" TEXT NOT NULL,
ADD COLUMN     "ADDRESS_2" TEXT NOT NULL,
ADD COLUMN     "CELL" TEXT NOT NULL,
ADD COLUMN     "CITY_1" TEXT NOT NULL,
ADD COLUMN     "CITY_2" TEXT NOT NULL,
ADD COLUMN     "COUNTRY" TEXT NOT NULL,
ADD COLUMN     "DEF_NAME_AGN" TEXT NOT NULL,
ADD COLUMN     "DEF_NAME_AS" TEXT NOT NULL,
ADD COLUMN     "EMAIL" TEXT NOT NULL,
ADD COLUMN     "EMAIL_2" TEXT NOT NULL,
ADD COLUMN     "FAX" TEXT NOT NULL,
ADD COLUMN     "FIRST_NAME" TEXT NOT NULL,
ADD COLUMN     "ID_BREEDER" INTEGER NOT NULL,
ADD COLUMN     "ID_PICTURE" INTEGER NOT NULL,
ADD COLUMN     "IS_DEFAULT_ADDRESS_1" INTEGER NOT NULL,
ADD COLUMN     "LAST_NAME" TEXT NOT NULL,
ADD COLUMN     "LOGIN_NAME" TEXT NOT NULL,
ADD COLUMN     "LOGIN_PASSWORD" TEXT NOT NULL,
ADD COLUMN     "NOTE" TEXT NOT NULL,
ADD COLUMN     "NUMBER" INTEGER NOT NULL,
ADD COLUMN     "PHONE" TEXT NOT NULL,
ADD COLUMN     "SMS" TEXT NOT NULL,
ADD COLUMN     "SOCIAL_SECURITY_NUMBER" TEXT NOT NULL,
ADD COLUMN     "STATE_1" TEXT NOT NULL,
ADD COLUMN     "STATE_2" TEXT NOT NULL,
ADD COLUMN     "STATUS" INTEGER NOT NULL,
ADD COLUMN     "STATUS_DATE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "TAX_NUMBER" TEXT NOT NULL,
ADD COLUMN     "WEB_ADDRESS" TEXT NOT NULL,
ADD COLUMN     "ZIP_1" TEXT NOT NULL,
ADD COLUMN     "ZIP_2" TEXT NOT NULL,
ADD CONSTRAINT "Breeders_pkey" PRIMARY KEY ("ID_BREEDER");

-- AlterTable
ALTER TABLE "DatasyncSys" DROP CONSTRAINT "DatasyncSys_pkey",
DROP COLUMN "dsext_ver",
DROP COLUMN "id",
ADD COLUMN     "DSEXT_VER" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ID" INTEGER NOT NULL,
ADD CONSTRAINT "DatasyncSys_pkey" PRIMARY KEY ("ID");

-- AlterTable
ALTER TABLE "DatasyncWeb" DROP CONSTRAINT "DatasyncWeb_pkey",
DROP COLUMN "dboperation",
DROP COLUMN "dbtable",
DROP COLUMN "dbtableidcolname",
DROP COLUMN "dbtablerow",
DROP COLUMN "dbtablerowid",
DROP COLUMN "id",
DROP COLUMN "processed",
ADD COLUMN     "DBOPERATION" TEXT NOT NULL,
ADD COLUMN     "DBTABLE" TEXT NOT NULL,
ADD COLUMN     "DBTABLEIDCOLNAME" TEXT NOT NULL,
ADD COLUMN     "DBTABLEROW" BYTEA NOT NULL,
ADD COLUMN     "DBTABLEROWID" INTEGER NOT NULL,
ADD COLUMN     "ID" INTEGER NOT NULL,
ADD COLUMN     "PROCESSED" INTEGER NOT NULL,
ADD CONSTRAINT "DatasyncWeb_pkey" PRIMARY KEY ("ID");

-- AlterTable
ALTER TABLE "EventInventory" DROP CONSTRAINT "EventInventory_pkey",
DROP COLUMN "id_breeder",
DROP COLUMN "id_event",
DROP COLUMN "id_event_inventory",
DROP COLUMN "is_waiting",
DROP COLUMN "loft",
DROP COLUMN "note",
DROP COLUMN "reserved_birds",
DROP COLUMN "sign_in_date",
DROP COLUMN "waiting_date",
ADD COLUMN     "ID_BREEDER" INTEGER NOT NULL,
ADD COLUMN     "ID_EVENT" INTEGER NOT NULL,
ADD COLUMN     "ID_EVENT_INVENTORY" INTEGER NOT NULL,
ADD COLUMN     "IS_WAITING" INTEGER NOT NULL,
ADD COLUMN     "LOFT" TEXT NOT NULL,
ADD COLUMN     "NOTE" TEXT NOT NULL,
ADD COLUMN     "RESERVED_BIRDS" INTEGER NOT NULL,
ADD COLUMN     "SIGN_IN_DATE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "WAITING_DATE" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "EventInventory_pkey" PRIMARY KEY ("ID_EVENT_INVENTORY");

-- AlterTable
ALTER TABLE "EventInventoryItem" DROP CONSTRAINT "EventInventoryItem_pkey",
DROP COLUMN "arrival_date",
DROP COLUMN "belgian_show_bet_1",
DROP COLUMN "belgian_show_bet_2",
DROP COLUMN "belgian_show_bet_3",
DROP COLUMN "belgian_show_bet_4",
DROP COLUMN "belgian_show_bet_5",
DROP COLUMN "belgian_show_bet_6",
DROP COLUMN "belgian_show_bet_7",
DROP COLUMN "bets_refund",
DROP COLUMN "bird_no",
DROP COLUMN "departure_date",
DROP COLUMN "entry_fee_paid",
DROP COLUMN "entry_fee_value",
DROP COLUMN "entry_refund",
DROP COLUMN "hot_spot_fee_value",
DROP COLUMN "hot_spot_refund",
DROP COLUMN "id_bird",
DROP COLUMN "id_event_inventory",
DROP COLUMN "id_event_inventory_item",
DROP COLUMN "id_replaced_item",
DROP COLUMN "is_backup",
DROP COLUMN "is_bet_active",
DROP COLUMN "perch_fee_value",
DROP COLUMN "standard_show_bet_1",
DROP COLUMN "standard_show_bet_2",
DROP COLUMN "standard_show_bet_3",
DROP COLUMN "standard_show_bet_4",
DROP COLUMN "standard_show_bet_5",
DROP COLUMN "standard_show_bet_6",
DROP COLUMN "transfer_due",
DROP COLUMN "wta_bet_1",
DROP COLUMN "wta_bet_2",
DROP COLUMN "wta_bet_3",
DROP COLUMN "wta_bet_4",
DROP COLUMN "wta_bet_5",
ADD COLUMN     "ARRIVAL_DATE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_BET_1" INTEGER NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_BET_2" INTEGER NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_BET_3" INTEGER NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_BET_4" INTEGER NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_BET_5" INTEGER NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_BET_6" INTEGER NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_BET_7" INTEGER NOT NULL,
ADD COLUMN     "BETS_REFUND" BIGINT NOT NULL,
ADD COLUMN     "BIRD_NO" INTEGER NOT NULL,
ADD COLUMN     "DEPARTURE_DATE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ENTRY_FEE_PAID" INTEGER NOT NULL,
ADD COLUMN     "ENTRY_FEE_VALUE" BIGINT NOT NULL,
ADD COLUMN     "ENTRY_REFUND" BIGINT NOT NULL,
ADD COLUMN     "HOT_SPOT_FEE_VALUE" BIGINT NOT NULL,
ADD COLUMN     "HOT_SPOT_REFUND" BIGINT NOT NULL,
ADD COLUMN     "ID_BIRD" INTEGER NOT NULL,
ADD COLUMN     "ID_EVENT_INVENTORY" INTEGER NOT NULL,
ADD COLUMN     "ID_EVENT_INVENTORY_ITEM" INTEGER NOT NULL,
ADD COLUMN     "ID_REPLACED_ITEM" INTEGER NOT NULL,
ADD COLUMN     "IS_BACKUP" INTEGER NOT NULL,
ADD COLUMN     "IS_BET_ACTIVE" INTEGER NOT NULL,
ADD COLUMN     "PERCH_FEE_VALUE" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_BET_1" INTEGER NOT NULL,
ADD COLUMN     "STANDARD_SHOW_BET_2" INTEGER NOT NULL,
ADD COLUMN     "STANDARD_SHOW_BET_3" INTEGER NOT NULL,
ADD COLUMN     "STANDARD_SHOW_BET_4" INTEGER NOT NULL,
ADD COLUMN     "STANDARD_SHOW_BET_5" INTEGER NOT NULL,
ADD COLUMN     "STANDARD_SHOW_BET_6" INTEGER NOT NULL,
ADD COLUMN     "TRANSFER_DUE" BIGINT NOT NULL,
ADD COLUMN     "WTA_BET_1" INTEGER NOT NULL,
ADD COLUMN     "WTA_BET_2" INTEGER NOT NULL,
ADD COLUMN     "WTA_BET_3" INTEGER NOT NULL,
ADD COLUMN     "WTA_BET_4" INTEGER NOT NULL,
ADD COLUMN     "WTA_BET_5" INTEGER NOT NULL,
ADD CONSTRAINT "EventInventoryItem_pkey" PRIMARY KEY ("ID_EVENT_INVENTORY_ITEM");

-- AlterTable
ALTER TABLE "EventRaceNumber" DROP CONSTRAINT "EventRaceNumber_pkey",
DROP COLUMN "id_event",
DROP COLUMN "id_number_group",
DROP COLUMN "number_range_from",
DROP COLUMN "number_range_to",
ADD COLUMN     "ID_EVENT" INTEGER NOT NULL,
ADD COLUMN     "ID_NUMBER_GROUP" INTEGER NOT NULL,
ADD COLUMN     "NUMBER_RANGE_FROM" INTEGER NOT NULL,
ADD COLUMN     "NUMBER_RANGE_TO" INTEGER NOT NULL,
ADD CONSTRAINT "EventRaceNumber_pkey" PRIMARY KEY ("ID_NUMBER_GROUP");

-- AlterTable
ALTER TABLE "Events" DROP CONSTRAINT "Events_pkey",
DROP COLUMN "event_date",
DROP COLUMN "event_name",
DROP COLUMN "event_short_name",
DROP COLUMN "event_type",
DROP COLUMN "id_betting_scheme",
DROP COLUMN "id_event",
DROP COLUMN "id_fee_scheme",
DROP COLUMN "id_final_prize_scheme",
DROP COLUMN "id_hot_spot1_prize_scheme",
DROP COLUMN "id_hot_spot2_prize_scheme",
DROP COLUMN "id_hot_spot3_prize_scheme",
DROP COLUMN "id_hot_spot_avg_prize_scheme",
DROP COLUMN "is_open",
ADD COLUMN     "EVENT_DATE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "EVENT_NAME" TEXT NOT NULL,
ADD COLUMN     "EVENT_SHORT_NAME" TEXT NOT NULL,
ADD COLUMN     "EVENT_TYPE" INTEGER NOT NULL,
ADD COLUMN     "ID_BETTING_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_EVENT" INTEGER NOT NULL,
ADD COLUMN     "ID_FEE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_FINAL_PRIZE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_HOT_SPOT1_PRIZE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_HOT_SPOT2_PRIZE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_HOT_SPOT3_PRIZE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_HOT_SPOT_AVG_PRIZE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "IS_OPEN" INTEGER NOT NULL,
ADD CONSTRAINT "Events_pkey" PRIMARY KEY ("ID_EVENT");

-- AlterTable
ALTER TABLE "FeeScheme" DROP CONSTRAINT "FeeScheme_pkey",
DROP COLUMN "entry_fee",
DROP COLUMN "fee_scheme_name",
DROP COLUMN "fees_cut_percent",
DROP COLUMN "hot_spot1_fee",
DROP COLUMN "hot_spot2_fee",
DROP COLUMN "hot_spot3_fee",
DROP COLUMN "hot_spot_final_fee",
DROP COLUMN "id_fee_scheme",
DROP COLUMN "is_floating_backup",
DROP COLUMN "is_refundable",
DROP COLUMN "max_backup_bird_count",
DROP COLUMN "max_bird_count",
DROP COLUMN "min_entry_fees",
ADD COLUMN     "ENTRY_FEE" BIGINT NOT NULL,
ADD COLUMN     "FEES_CUT_PERCENT" BIGINT NOT NULL,
ADD COLUMN     "FEE_SCHEME_NAME" TEXT NOT NULL,
ADD COLUMN     "HOT_SPOT1_FEE" BIGINT NOT NULL,
ADD COLUMN     "HOT_SPOT2_FEE" BIGINT NOT NULL,
ADD COLUMN     "HOT_SPOT3_FEE" BIGINT NOT NULL,
ADD COLUMN     "HOT_SPOT_FINAL_FEE" BIGINT NOT NULL,
ADD COLUMN     "ID_FEE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "IS_FLOATING_BACKUP" INTEGER NOT NULL,
ADD COLUMN     "IS_REFUNDABLE" INTEGER NOT NULL,
ADD COLUMN     "MAX_BACKUP_BIRD_COUNT" INTEGER NOT NULL,
ADD COLUMN     "MAX_BIRD_COUNT" INTEGER NOT NULL,
ADD COLUMN     "MIN_ENTRY_FEES" INTEGER NOT NULL,
ADD CONSTRAINT "FeeScheme_pkey" PRIMARY KEY ("ID_FEE_SCHEME");

-- AlterTable
ALTER TABLE "IbeLogBlobFields" DROP CONSTRAINT "IbeLogBlobFields_pkey",
DROP COLUMN "field_name",
DROP COLUMN "log_tables_id",
DROP COLUMN "new_blob_value",
DROP COLUMN "new_char_value",
DROP COLUMN "old_blob_value",
DROP COLUMN "old_char_value",
ADD COLUMN     "FIELD_NAME" TEXT NOT NULL,
ADD COLUMN     "LOG_TABLES_ID" BIGINT NOT NULL,
ADD COLUMN     "NEW_BLOB_VALUE" BYTEA NOT NULL,
ADD COLUMN     "NEW_CHAR_VALUE" TEXT NOT NULL,
ADD COLUMN     "OLD_BLOB_VALUE" BYTEA NOT NULL,
ADD COLUMN     "OLD_CHAR_VALUE" TEXT NOT NULL,
ADD CONSTRAINT "IbeLogBlobFields_pkey" PRIMARY KEY ("LOG_TABLES_ID");

-- AlterTable
ALTER TABLE "IbeLogFields" DROP CONSTRAINT "IbeLogFields_pkey",
DROP COLUMN "field_name",
DROP COLUMN "log_tables_id",
DROP COLUMN "new_value",
DROP COLUMN "old_value",
ADD COLUMN     "FIELD_NAME" TEXT NOT NULL,
ADD COLUMN     "LOG_TABLES_ID" BIGINT NOT NULL,
ADD COLUMN     "NEW_VALUE" TEXT NOT NULL,
ADD COLUMN     "OLD_VALUE" TEXT NOT NULL,
ADD CONSTRAINT "IbeLogFields_pkey" PRIMARY KEY ("LOG_TABLES_ID");

-- AlterTable
ALTER TABLE "IbeLogKeys" DROP CONSTRAINT "IbeLogKeys_pkey",
DROP COLUMN "key_field",
DROP COLUMN "key_value",
DROP COLUMN "log_tables_id",
ADD COLUMN     "KEY_FIELD" TEXT NOT NULL,
ADD COLUMN     "KEY_VALUE" TEXT NOT NULL,
ADD COLUMN     "LOG_TABLES_ID" BIGINT NOT NULL,
ADD CONSTRAINT "IbeLogKeys_pkey" PRIMARY KEY ("LOG_TABLES_ID");

-- AlterTable
ALTER TABLE "IbeLogTables" DROP CONSTRAINT "IbeLogTables_pkey",
DROP COLUMN "date_time",
DROP COLUMN "id",
DROP COLUMN "operation",
DROP COLUMN "table_name",
DROP COLUMN "user_name",
ADD COLUMN     "DATE_TIME" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ID" BIGINT NOT NULL,
ADD COLUMN     "OPERATION" TEXT NOT NULL,
ADD COLUMN     "TABLE_NAME" TEXT NOT NULL,
ADD COLUMN     "USER_NAME" TEXT NOT NULL,
ADD CONSTRAINT "IbeLogTables_pkey" PRIMARY KEY ("ID");

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
DROP COLUMN "category",
DROP COLUMN "content",
DROP COLUMN "dt_logged",
DROP COLUMN "id_log",
DROP COLUMN "id_user",
DROP COLUMN "log_level",
DROP COLUMN "machine",
ADD COLUMN     "CATEGORY" TEXT NOT NULL,
ADD COLUMN     "CONTENT" TEXT NOT NULL,
ADD COLUMN     "DT_LOGGED" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ID_LOG" INTEGER NOT NULL,
ADD COLUMN     "ID_USER" INTEGER NOT NULL,
ADD COLUMN     "LOG_LEVEL" TEXT NOT NULL,
ADD COLUMN     "MACHINE" TEXT NOT NULL,
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("ID_LOG");

-- AlterTable
ALTER TABLE "LogUserLoggedin" DROP COLUMN "id_log",
DROP COLUMN "id_user",
ADD COLUMN     "ID_LOG" INTEGER NOT NULL,
ADD COLUMN     "ID_USER" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LogUserLoggedout" DROP COLUMN "id_log",
DROP COLUMN "id_logged_in",
ADD COLUMN     "ID_LOG" INTEGER NOT NULL,
ADD COLUMN     "ID_LOGGED_IN" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LostHistory" DROP CONSTRAINT "LostHistory_pkey",
DROP COLUMN "id_bird",
DROP COLUMN "id_lost_history",
DROP COLUMN "id_race",
DROP COLUMN "is_lost",
DROP COLUMN "lost_date",
ADD COLUMN     "ID_BIRD" INTEGER NOT NULL,
ADD COLUMN     "ID_LOST_HISTORY" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "IS_LOST" INTEGER NOT NULL,
ADD COLUMN     "LOST_DATE" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "LostHistory_pkey" PRIMARY KEY ("ID_LOST_HISTORY");

-- AlterTable
ALTER TABLE "OrganizerData" DROP CONSTRAINT "OrganizerData_pkey",
DROP COLUMN "address",
DROP COLUMN "cell",
DROP COLUMN "city",
DROP COLUMN "email",
DROP COLUMN "fax",
DROP COLUMN "name",
DROP COLUMN "note",
DROP COLUMN "phone",
DROP COLUMN "state",
DROP COLUMN "web",
DROP COLUMN "zip",
ADD COLUMN     "ADDRESS" TEXT NOT NULL,
ADD COLUMN     "CELL" TEXT NOT NULL,
ADD COLUMN     "CITY" TEXT NOT NULL,
ADD COLUMN     "EMAIL" TEXT NOT NULL,
ADD COLUMN     "FAX" TEXT NOT NULL,
ADD COLUMN     "NAME" TEXT NOT NULL,
ADD COLUMN     "NOTE" TEXT NOT NULL,
ADD COLUMN     "PHONE" TEXT NOT NULL,
ADD COLUMN     "STATE" TEXT NOT NULL,
ADD COLUMN     "WEB" TEXT NOT NULL,
ADD COLUMN     "ZIP" TEXT NOT NULL,
ADD CONSTRAINT "OrganizerData_pkey" PRIMARY KEY ("EMAIL");

-- AlterTable
ALTER TABLE "Partners" DROP COLUMN "id_breeder",
DROP COLUMN "id_event_inventory",
ADD COLUMN     "ID_BREEDER" INTEGER NOT NULL,
ADD COLUMN     "ID_EVENT_INVENTORY" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_pkey",
DROP COLUMN "id_event_inventory",
DROP COLUMN "id_payment",
DROP COLUMN "id_picture",
DROP COLUMN "payment_date",
DROP COLUMN "payment_desc",
DROP COLUMN "payment_method",
DROP COLUMN "payment_timestamp",
DROP COLUMN "payment_type",
DROP COLUMN "payment_value",
ADD COLUMN     "ID_EVENT_INVENTORY" INTEGER NOT NULL,
ADD COLUMN     "ID_PAYMENT" INTEGER NOT NULL,
ADD COLUMN     "ID_PICTURE" INTEGER NOT NULL,
ADD COLUMN     "PAYMENT_DATE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "PAYMENT_DESC" TEXT NOT NULL,
ADD COLUMN     "PAYMENT_METHOD" INTEGER NOT NULL,
ADD COLUMN     "PAYMENT_TIMESTAMP" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "PAYMENT_TYPE" INTEGER NOT NULL,
ADD COLUMN     "PAYMENT_VALUE" BIGINT NOT NULL,
ADD CONSTRAINT "Payments_pkey" PRIMARY KEY ("ID_PAYMENT");

-- AlterTable
ALTER TABLE "PerchFeeItem" DROP CONSTRAINT "PerchFeeItem_pkey",
DROP COLUMN "bird_no",
DROP COLUMN "id_fee_scheme",
DROP COLUMN "id_perch_fee_item",
DROP COLUMN "perch_fee",
ADD COLUMN     "BIRD_NO" INTEGER NOT NULL,
ADD COLUMN     "ID_FEE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_PERCH_FEE_ITEM" INTEGER NOT NULL,
ADD COLUMN     "PERCH_FEE" BIGINT NOT NULL,
ADD CONSTRAINT "PerchFeeItem_pkey" PRIMARY KEY ("ID_PERCH_FEE_ITEM");

-- AlterTable
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_pkey",
DROP COLUMN "id_picture",
DROP COLUMN "picture",
DROP COLUMN "picture_layout",
DROP COLUMN "picture_type",
ADD COLUMN     "ID_PICTURE" INTEGER NOT NULL,
ADD COLUMN     "PICTURE" BYTEA NOT NULL,
ADD COLUMN     "PICTURE_LAYOUT" TEXT NOT NULL,
ADD COLUMN     "PICTURE_TYPE" TEXT NOT NULL,
ADD CONSTRAINT "Picture_pkey" PRIMARY KEY ("ID_PICTURE");

-- AlterTable
ALTER TABLE "PrizeScheme" DROP CONSTRAINT "PrizeScheme_pkey",
DROP COLUMN "id_prize_scheme",
DROP COLUMN "prize_name",
ADD COLUMN     "ID_PRIZE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "PRIZE_NAME" TEXT NOT NULL,
ADD CONSTRAINT "PrizeScheme_pkey" PRIMARY KEY ("ID_PRIZE_SCHEME");

-- AlterTable
ALTER TABLE "PrizeSchemeItem" DROP CONSTRAINT "PrizeSchemeItem_pkey",
DROP COLUMN "from_position",
DROP COLUMN "id_prize_scheme",
DROP COLUMN "id_prize_scheme_item",
DROP COLUMN "prize_value",
DROP COLUMN "to_position",
ADD COLUMN     "FROM_POSITION" INTEGER NOT NULL,
ADD COLUMN     "ID_PRIZE_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_PRIZE_SCHEME_ITEM" INTEGER NOT NULL,
ADD COLUMN     "PRIZE_VALUE" BIGINT NOT NULL,
ADD COLUMN     "TO_POSITION" INTEGER NOT NULL,
ADD CONSTRAINT "PrizeSchemeItem_pkey" PRIMARY KEY ("ID_PRIZE_SCHEME_ITEM");

-- AlterTable
ALTER TABLE "PrizeValue" DROP CONSTRAINT "PrizeValue_pkey",
DROP COLUMN "id_event",
DROP COLUMN "id_prize_scheme_item",
DROP COLUMN "id_prize_value",
DROP COLUMN "id_race_type",
DROP COLUMN "prize_value",
ADD COLUMN     "ID_EVENT" INTEGER NOT NULL,
ADD COLUMN     "ID_PRIZE_SCHEME_ITEM" INTEGER NOT NULL,
ADD COLUMN     "ID_PRIZE_VALUE" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_TYPE" INTEGER NOT NULL,
ADD COLUMN     "PRIZE_VALUE" BIGINT NOT NULL,
ADD CONSTRAINT "PrizeValue_pkey" PRIMARY KEY ("ID_PRIZE_VALUE");

-- AlterTable
ALTER TABLE "Race" DROP CONSTRAINT "Race_pkey",
DROP COLUMN "arrival_temperature",
DROP COLUMN "arrival_weather",
DROP COLUMN "arrival_wind",
DROP COLUMN "description",
DROP COLUMN "distance",
DROP COLUMN "end_time",
DROP COLUMN "id_event",
DROP COLUMN "id_race",
DROP COLUMN "id_race_type",
DROP COLUMN "is_closed",
DROP COLUMN "location",
DROP COLUMN "race_number",
DROP COLUMN "start_time",
DROP COLUMN "sunrise",
DROP COLUMN "sunset",
DROP COLUMN "temperature",
DROP COLUMN "weather",
DROP COLUMN "wind",
ADD COLUMN     "ARRIVAL_TEMPERATURE" TEXT NOT NULL,
ADD COLUMN     "ARRIVAL_WEATHER" TEXT NOT NULL,
ADD COLUMN     "ARRIVAL_WIND" TEXT NOT NULL,
ADD COLUMN     "DESCRIPTION" TEXT NOT NULL,
ADD COLUMN     "DISTANCE" INTEGER NOT NULL,
ADD COLUMN     "END_TIME" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ID_EVENT" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_TYPE" INTEGER NOT NULL,
ADD COLUMN     "IS_CLOSED" INTEGER NOT NULL,
ADD COLUMN     "LOCATION" TEXT NOT NULL,
ADD COLUMN     "RACE_NUMBER" INTEGER NOT NULL,
ADD COLUMN     "START_TIME" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "SUNRISE" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "SUNSET" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "TEMPERATURE" TEXT NOT NULL,
ADD COLUMN     "WEATHER" TEXT NOT NULL,
ADD COLUMN     "WIND" TEXT NOT NULL,
ADD CONSTRAINT "Race_pkey" PRIMARY KEY ("ID_RACE");

-- AlterTable
ALTER TABLE "RaceIgnoreBird" DROP CONSTRAINT "RaceIgnoreBird_pkey",
DROP COLUMN "id_event_inventory_item",
DROP COLUMN "id_ignore_bird",
DROP COLUMN "id_race",
DROP COLUMN "note",
ADD COLUMN     "ID_EVENT_INVENTORY_ITEM" INTEGER NOT NULL,
ADD COLUMN     "ID_IGNORE_BIRD" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "NOTE" TEXT NOT NULL,
ADD CONSTRAINT "RaceIgnoreBird_pkey" PRIMARY KEY ("ID_IGNORE_BIRD");

-- AlterTable
ALTER TABLE "RaceItem" DROP CONSTRAINT "RaceItem_pkey",
DROP COLUMN "id_dist_basket",
DROP COLUMN "id_inventory_item",
DROP COLUMN "id_race",
DROP COLUMN "id_race_basket",
DROP COLUMN "id_race_item",
DROP COLUMN "is_dist_basketed",
DROP COLUMN "is_lost",
DROP COLUMN "lost_id_race",
DROP COLUMN "race_basket_time",
ADD COLUMN     "ID_DIST_BASKET" INTEGER NOT NULL,
ADD COLUMN     "ID_INVENTORY_ITEM" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_BASKET" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_ITEM" INTEGER NOT NULL,
ADD COLUMN     "IS_DIST_BASKETED" INTEGER NOT NULL,
ADD COLUMN     "IS_LOST" INTEGER NOT NULL,
ADD COLUMN     "LOST_ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "RACE_BASKET_TIME" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "RaceItem_pkey" PRIMARY KEY ("ID_RACE_ITEM");

-- AlterTable
ALTER TABLE "RaceItemResult" DROP CONSTRAINT "RaceItemResult_pkey",
DROP COLUMN "arrival_time",
DROP COLUMN "bird_drop",
DROP COLUMN "bird_position",
DROP COLUMN "bird_position_hot_spot",
DROP COLUMN "id_race_item",
DROP COLUMN "prize_value",
ADD COLUMN     "ARRIVAL_TIME" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "BIRD_DROP" INTEGER NOT NULL,
ADD COLUMN     "BIRD_POSITION" INTEGER NOT NULL,
ADD COLUMN     "BIRD_POSITION_HOT_SPOT" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_ITEM" INTEGER NOT NULL,
ADD COLUMN     "PRIZE_VALUE" BIGINT NOT NULL,
ADD CONSTRAINT "RaceItemResult_pkey" PRIMARY KEY ("ID_RACE_ITEM");

-- AlterTable
ALTER TABLE "RaceItemScan" DROP COLUMN "id_race",
DROP COLUMN "id_race_item",
DROP COLUMN "scan_pos",
ADD COLUMN     "ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_ITEM" INTEGER NOT NULL,
ADD COLUMN     "SCAN_POS" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RaceNumberGroup" DROP CONSTRAINT "RaceNumberGroup_pkey",
DROP COLUMN "id_race_number_group",
ADD COLUMN     "ID_RACE_NUMBER_GROUP" INTEGER NOT NULL,
ADD CONSTRAINT "RaceNumberGroup_pkey" PRIMARY KEY ("ID_RACE_NUMBER_GROUP");

-- AlterTable
ALTER TABLE "RacePhantomBird" DROP CONSTRAINT "RacePhantomBird_pkey",
DROP COLUMN "arrival_time",
DROP COLUMN "id_bird",
DROP COLUMN "id_event",
DROP COLUMN "id_race",
DROP COLUMN "id_race_phantom_bird",
DROP COLUMN "rf_id",
ADD COLUMN     "ARRIVAL_TIME" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ID_BIRD" INTEGER NOT NULL,
ADD COLUMN     "ID_EVENT" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_PHANTOM_BIRD" INTEGER NOT NULL,
ADD COLUMN     "RF_ID" TEXT NOT NULL,
ADD CONSTRAINT "RacePhantomBird_pkey" PRIMARY KEY ("ID_RACE_PHANTOM_BIRD");

-- AlterTable
ALTER TABLE "RaceType" DROP CONSTRAINT "RaceType_pkey",
DROP COLUMN "id_number_group",
DROP COLUMN "id_race_type",
DROP COLUMN "type_name",
ADD COLUMN     "ID_NUMBER_GROUP" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_TYPE" INTEGER NOT NULL,
ADD COLUMN     "TYPE_NAME" TEXT NOT NULL,
ADD CONSTRAINT "RaceType_pkey" PRIMARY KEY ("ID_RACE_TYPE");

-- AlterTable
ALTER TABLE "ReportClasses" DROP CONSTRAINT "ReportClasses_pkey",
DROP COLUMN "caption",
DROP COLUMN "copies",
DROP COLUMN "ident",
DROP COLUMN "type",
ADD COLUMN     "CAPTION" TEXT NOT NULL,
ADD COLUMN     "COPIES" INTEGER NOT NULL,
ADD COLUMN     "IDENT" TEXT NOT NULL,
ADD COLUMN     "TYPE" TEXT NOT NULL,
ADD CONSTRAINT "ReportClasses_pkey" PRIMARY KEY ("IDENT");

-- AlterTable
ALTER TABLE "ReportIds" DROP CONSTRAINT "ReportIds_pkey",
DROP COLUMN "id",
ADD COLUMN     "ID" INTEGER NOT NULL,
ADD CONSTRAINT "ReportIds_pkey" PRIMARY KEY ("ID");

-- AlterTable
ALTER TABLE "Reports" DROP CONSTRAINT "Reports_pkey",
DROP COLUMN "class_",
DROP COLUMN "default_caption",
DROP COLUMN "fastreport_content",
DROP COLUMN "id_report",
DROP COLUMN "ident",
DROP COLUMN "is_deleted",
ADD COLUMN     "CLASS_" TEXT NOT NULL,
ADD COLUMN     "DEFAULT_CAPTION" TEXT NOT NULL,
ADD COLUMN     "FASTREPORT_CONTENT" BYTEA NOT NULL,
ADD COLUMN     "IDENT" TEXT NOT NULL,
ADD COLUMN     "ID_REPORT" INTEGER NOT NULL,
ADD COLUMN     "IS_DELETED" INTEGER NOT NULL,
ADD CONSTRAINT "Reports_pkey" PRIMARY KEY ("ID_REPORT");

-- AlterTable
ALTER TABLE "RightGroupLines" DROP CONSTRAINT "RightGroupLines_pkey",
DROP COLUMN "grant_level",
DROP COLUMN "id_right_group",
DROP COLUMN "id_right_group_line",
DROP COLUMN "right_code",
ADD COLUMN     "GRANT_LEVEL" INTEGER NOT NULL,
ADD COLUMN     "ID_RIGHT_GROUP" INTEGER NOT NULL,
ADD COLUMN     "ID_RIGHT_GROUP_LINE" INTEGER NOT NULL,
ADD COLUMN     "RIGHT_CODE" TEXT NOT NULL,
ADD CONSTRAINT "RightGroupLines_pkey" PRIMARY KEY ("ID_RIGHT_GROUP_LINE");

-- AlterTable
ALTER TABLE "RightGroups" DROP CONSTRAINT "RightGroups_pkey",
DROP COLUMN "id_right_group",
DROP COLUMN "name",
ADD COLUMN     "ID_RIGHT_GROUP" INTEGER NOT NULL,
ADD COLUMN     "NAME" TEXT NOT NULL,
ADD CONSTRAINT "RightGroups_pkey" PRIMARY KEY ("ID_RIGHT_GROUP");

-- AlterTable
ALTER TABLE "StandardShowPercentage" DROP CONSTRAINT "StandardShowPercentage_pkey",
DROP COLUMN "id_betting_scheme",
DROP COLUMN "id_standard_show_percentage",
DROP COLUMN "perc_value",
DROP COLUMN "place",
ADD COLUMN     "ID_BETTING_SCHEME" INTEGER NOT NULL,
ADD COLUMN     "ID_STANDARD_SHOW_PERCENTAGE" INTEGER NOT NULL,
ADD COLUMN     "PERC_VALUE" BIGINT NOT NULL,
ADD COLUMN     "PLACE" INTEGER NOT NULL,
ADD CONSTRAINT "StandardShowPercentage_pkey" PRIMARY KEY ("ID_STANDARD_SHOW_PERCENTAGE");

-- AlterTable
ALTER TABLE "SystemCfg" DROP CONSTRAINT "SystemCfg_pkey",
DROP COLUMN "cfg_key",
DROP COLUMN "cfg_value",
ADD COLUMN     "CFG_KEY" TEXT NOT NULL,
ADD COLUMN     "CFG_VALUE" TEXT NOT NULL,
ADD CONSTRAINT "SystemCfg_pkey" PRIMARY KEY ("CFG_KEY");

-- AlterTable
ALTER TABLE "SystemInfo" DROP CONSTRAINT "SystemInfo_pkey",
DROP COLUMN "info_key",
DROP COLUMN "info_value",
ADD COLUMN     "INFO_KEY" TEXT NOT NULL,
ADD COLUMN     "INFO_VALUE" TEXT NOT NULL,
ADD CONSTRAINT "SystemInfo_pkey" PRIMARY KEY ("INFO_KEY");

-- AlterTable
ALTER TABLE "SystemRequirements" DROP CONSTRAINT "SystemRequirements_pkey",
DROP COLUMN "id_info_update",
DROP COLUMN "id_system_update",
DROP COLUMN "module_name",
DROP COLUMN "required_version",
ADD COLUMN     "ID_INFO_UPDATE" INTEGER NOT NULL,
ADD COLUMN     "ID_SYSTEM_UPDATE" INTEGER NOT NULL,
ADD COLUMN     "MODULE_NAME" TEXT NOT NULL,
ADD COLUMN     "REQUIRED_VERSION" TEXT NOT NULL,
ADD CONSTRAINT "SystemRequirements_pkey" PRIMARY KEY ("ID_INFO_UPDATE");

-- AlterTable
ALTER TABLE "SystemSession" DROP CONSTRAINT "SystemSession_pkey",
DROP COLUMN "session_key",
DROP COLUMN "session_value",
ADD COLUMN     "SESSION_KEY" TEXT NOT NULL,
ADD COLUMN     "SESSION_VALUE" TEXT NOT NULL,
ADD CONSTRAINT "SystemSession_pkey" PRIMARY KEY ("SESSION_KEY");

-- AlterTable
ALTER TABLE "SystemUpdates" DROP CONSTRAINT "SystemUpdates_pkey",
DROP COLUMN "change_info",
DROP COLUMN "datetime_execution",
DROP COLUMN "id_system_update",
DROP COLUMN "patch_version",
ADD COLUMN     "CHANGE_INFO" BYTEA NOT NULL,
ADD COLUMN     "DATETIME_EXECUTION" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ID_SYSTEM_UPDATE" INTEGER NOT NULL,
ADD COLUMN     "PATCH_VERSION" TEXT NOT NULL,
ADD CONSTRAINT "SystemUpdates_pkey" PRIMARY KEY ("ID_SYSTEM_UPDATE");

-- AlterTable
ALTER TABLE "TmpAvgSpeed" DROP CONSTRAINT "TmpAvgSpeed_pkey",
DROP COLUMN "avg_speed_in_miles",
DROP COLUMN "avg_speed_in_yards",
DROP COLUMN "bird_position",
DROP COLUMN "flight_distance",
DROP COLUMN "flight_time",
DROP COLUMN "id_event_inventory_item",
ADD COLUMN     "AVG_SPEED_IN_MILES" BIGINT NOT NULL,
ADD COLUMN     "AVG_SPEED_IN_YARDS" BIGINT NOT NULL,
ADD COLUMN     "BIRD_POSITION" INTEGER NOT NULL,
ADD COLUMN     "FLIGHT_DISTANCE" INTEGER NOT NULL,
ADD COLUMN     "FLIGHT_TIME" BIGINT NOT NULL,
ADD COLUMN     "ID_EVENT_INVENTORY_ITEM" INTEGER NOT NULL,
ADD CONSTRAINT "TmpAvgSpeed_pkey" PRIMARY KEY ("ID_EVENT_INVENTORY_ITEM");

-- AlterTable
ALTER TABLE "TmpBets" DROP CONSTRAINT "TmpBets_pkey",
DROP COLUMN "belgian_show_1",
DROP COLUMN "belgian_show_2",
DROP COLUMN "belgian_show_3",
DROP COLUMN "belgian_show_4",
DROP COLUMN "belgian_show_5",
DROP COLUMN "belgian_show_6",
DROP COLUMN "belgian_show_7",
DROP COLUMN "bird_drop",
DROP COLUMN "exec_time",
DROP COLUMN "id_event_inventory_item",
DROP COLUMN "id_race_item",
DROP COLUMN "standard_show_1",
DROP COLUMN "standard_show_2",
DROP COLUMN "standard_show_3",
DROP COLUMN "standard_show_4",
DROP COLUMN "standard_show_5",
DROP COLUMN "standard_show_6",
DROP COLUMN "total",
DROP COLUMN "wta_1",
DROP COLUMN "wta_2",
DROP COLUMN "wta_3",
DROP COLUMN "wta_4",
DROP COLUMN "wta_5",
ADD COLUMN     "BELGIAN_SHOW_1" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_2" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_3" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_4" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_5" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_6" BIGINT NOT NULL,
ADD COLUMN     "BELGIAN_SHOW_7" BIGINT NOT NULL,
ADD COLUMN     "BIRD_DROP" INTEGER NOT NULL,
ADD COLUMN     "EXEC_TIME" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ID_EVENT_INVENTORY_ITEM" INTEGER NOT NULL,
ADD COLUMN     "ID_RACE_ITEM" INTEGER NOT NULL,
ADD COLUMN     "STANDARD_SHOW_1" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_2" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_3" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_4" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_5" BIGINT NOT NULL,
ADD COLUMN     "STANDARD_SHOW_6" BIGINT NOT NULL,
ADD COLUMN     "TOTAL" BIGINT NOT NULL,
ADD COLUMN     "WTA_1" BIGINT NOT NULL,
ADD COLUMN     "WTA_2" BIGINT NOT NULL,
ADD COLUMN     "WTA_3" BIGINT NOT NULL,
ADD COLUMN     "WTA_4" BIGINT NOT NULL,
ADD COLUMN     "WTA_5" BIGINT NOT NULL,
ADD CONSTRAINT "TmpBets_pkey" PRIMARY KEY ("ID_RACE_ITEM");

-- AlterTable
ALTER TABLE "TmpId" DROP CONSTRAINT "TmpId_pkey",
DROP COLUMN "id",
DROP COLUMN "tag",
ADD COLUMN     "ID" INTEGER NOT NULL,
ADD COLUMN     "TAG" TEXT NOT NULL,
ADD CONSTRAINT "TmpId_pkey" PRIMARY KEY ("ID");

-- AlterTable
ALTER TABLE "UserRightGroups" DROP CONSTRAINT "UserRightGroups_pkey",
DROP COLUMN "id_right_group",
DROP COLUMN "id_user",
DROP COLUMN "id_user_right_group",
ADD COLUMN     "ID_RIGHT_GROUP" INTEGER NOT NULL,
ADD COLUMN     "ID_USER" INTEGER NOT NULL,
ADD COLUMN     "ID_USER_RIGHT_GROUP" INTEGER NOT NULL,
ADD CONSTRAINT "UserRightGroups_pkey" PRIMARY KEY ("ID_USER_RIGHT_GROUP");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "email_address",
DROP COLUMN "full_name",
DROP COLUMN "id_user",
DROP COLUMN "is_active",
DROP COLUMN "login_name",
DROP COLUMN "password",
ADD COLUMN     "EMAIL_ADDRESS" TEXT NOT NULL,
ADD COLUMN     "FULL_NAME" TEXT NOT NULL,
ADD COLUMN     "ID_USER" INTEGER NOT NULL,
ADD COLUMN     "IS_ACTIVE" INTEGER NOT NULL,
ADD COLUMN     "LOGIN_NAME" TEXT NOT NULL,
ADD COLUMN     "PASSWORD" TEXT NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("ID_USER");

-- CreateIndex
CREATE UNIQUE INDEX "LogUserLoggedin_ID_LOG_ID_USER_key" ON "LogUserLoggedin"("ID_LOG", "ID_USER");

-- CreateIndex
CREATE UNIQUE INDEX "LogUserLoggedout_ID_LOG_ID_LOGGED_IN_key" ON "LogUserLoggedout"("ID_LOG", "ID_LOGGED_IN");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_ID_EVENT_INVENTORY_ID_BREEDER_key" ON "Partners"("ID_EVENT_INVENTORY", "ID_BREEDER");

-- CreateIndex
CREATE UNIQUE INDEX "RaceItemScan_ID_RACE_ID_RACE_ITEM_key" ON "RaceItemScan"("ID_RACE", "ID_RACE_ITEM");
