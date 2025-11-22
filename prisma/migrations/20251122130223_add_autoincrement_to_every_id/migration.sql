-- AlterTable
CREATE SEQUENCE avgwinnerprizes_id_event_inventory_item_seq;
ALTER TABLE "AvgWinnerPrizes" ALTER COLUMN "ID_EVENT_INVENTORY_ITEM" SET DEFAULT nextval('avgwinnerprizes_id_event_inventory_item_seq');
ALTER SEQUENCE avgwinnerprizes_id_event_inventory_item_seq OWNED BY "AvgWinnerPrizes"."ID_EVENT_INVENTORY_ITEM";

-- AlterTable
CREATE SEQUENCE basket_id_basket_seq;
ALTER TABLE "Basket" ALTER COLUMN "ID_BASKET" SET DEFAULT nextval('basket_id_basket_seq');
ALTER SEQUENCE basket_id_basket_seq OWNED BY "Basket"."ID_BASKET";

-- AlterTable
CREATE SEQUENCE bettingscheme_id_betting_scheme_seq;
ALTER TABLE "BettingScheme" ALTER COLUMN "ID_BETTING_SCHEME" SET DEFAULT nextval('bettingscheme_id_betting_scheme_seq');
ALTER SEQUENCE bettingscheme_id_betting_scheme_seq OWNED BY "BettingScheme"."ID_BETTING_SCHEME";

-- AlterTable
CREATE SEQUENCE birds_id_bird_seq;
ALTER TABLE "Birds" ALTER COLUMN "ID_BIRD" SET DEFAULT nextval('birds_id_bird_seq');
ALTER SEQUENCE birds_id_bird_seq OWNED BY "Birds"."ID_BIRD";

-- AlterTable
CREATE SEQUENCE birdsview_id_bird_seq;
ALTER TABLE "BirdsView" ALTER COLUMN "ID_BIRD" SET DEFAULT nextval('birdsview_id_bird_seq');
ALTER SEQUENCE birdsview_id_bird_seq OWNED BY "BirdsView"."ID_BIRD";

-- AlterTable
CREATE SEQUENCE datasyncsys_id_seq;
ALTER TABLE "DatasyncSys" ALTER COLUMN "ID" SET DEFAULT nextval('datasyncsys_id_seq');
ALTER SEQUENCE datasyncsys_id_seq OWNED BY "DatasyncSys"."ID";

-- AlterTable
CREATE SEQUENCE datasyncweb_id_seq;
ALTER TABLE "DatasyncWeb" ALTER COLUMN "ID" SET DEFAULT nextval('datasyncweb_id_seq');
ALTER SEQUENCE datasyncweb_id_seq OWNED BY "DatasyncWeb"."ID";

-- AlterTable
CREATE SEQUENCE eventinventory_id_event_inventory_seq;
ALTER TABLE "EventInventory" ALTER COLUMN "ID_EVENT_INVENTORY" SET DEFAULT nextval('eventinventory_id_event_inventory_seq');
ALTER SEQUENCE eventinventory_id_event_inventory_seq OWNED BY "EventInventory"."ID_EVENT_INVENTORY";

-- AlterTable
CREATE SEQUENCE eventinventoryitem_id_event_inventory_item_seq;
ALTER TABLE "EventInventoryItem" ALTER COLUMN "ID_EVENT_INVENTORY_ITEM" SET DEFAULT nextval('eventinventoryitem_id_event_inventory_item_seq');
ALTER SEQUENCE eventinventoryitem_id_event_inventory_item_seq OWNED BY "EventInventoryItem"."ID_EVENT_INVENTORY_ITEM";

-- AlterTable
CREATE SEQUENCE events_id_event_seq;
ALTER TABLE "Events" ALTER COLUMN "ID_EVENT" SET DEFAULT nextval('events_id_event_seq');
ALTER SEQUENCE events_id_event_seq OWNED BY "Events"."ID_EVENT";

-- AlterTable
CREATE SEQUENCE feescheme_id_fee_scheme_seq;
ALTER TABLE "FeeScheme" ALTER COLUMN "ID_FEE_SCHEME" SET DEFAULT nextval('feescheme_id_fee_scheme_seq');
ALTER SEQUENCE feescheme_id_fee_scheme_seq OWNED BY "FeeScheme"."ID_FEE_SCHEME";

-- AlterTable
CREATE SEQUENCE log_id_log_seq;
ALTER TABLE "Log" ALTER COLUMN "ID_LOG" SET DEFAULT nextval('log_id_log_seq');
ALTER SEQUENCE log_id_log_seq OWNED BY "Log"."ID_LOG";

-- AlterTable
CREATE SEQUENCE losthistory_id_lost_history_seq;
ALTER TABLE "LostHistory" ALTER COLUMN "ID_LOST_HISTORY" SET DEFAULT nextval('losthistory_id_lost_history_seq');
ALTER SEQUENCE losthistory_id_lost_history_seq OWNED BY "LostHistory"."ID_LOST_HISTORY";

-- AlterTable
CREATE SEQUENCE payments_id_payment_seq;
ALTER TABLE "Payments" ALTER COLUMN "ID_PAYMENT" SET DEFAULT nextval('payments_id_payment_seq');
ALTER SEQUENCE payments_id_payment_seq OWNED BY "Payments"."ID_PAYMENT";

-- AlterTable
CREATE SEQUENCE perchfeeitem_id_perch_fee_item_seq;
ALTER TABLE "PerchFeeItem" ALTER COLUMN "ID_PERCH_FEE_ITEM" SET DEFAULT nextval('perchfeeitem_id_perch_fee_item_seq');
ALTER SEQUENCE perchfeeitem_id_perch_fee_item_seq OWNED BY "PerchFeeItem"."ID_PERCH_FEE_ITEM";

-- AlterTable
CREATE SEQUENCE picture_id_picture_seq;
ALTER TABLE "Picture" ALTER COLUMN "ID_PICTURE" SET DEFAULT nextval('picture_id_picture_seq');
ALTER SEQUENCE picture_id_picture_seq OWNED BY "Picture"."ID_PICTURE";

-- AlterTable
CREATE SEQUENCE prizescheme_id_prize_scheme_seq;
ALTER TABLE "PrizeScheme" ALTER COLUMN "ID_PRIZE_SCHEME" SET DEFAULT nextval('prizescheme_id_prize_scheme_seq');
ALTER SEQUENCE prizescheme_id_prize_scheme_seq OWNED BY "PrizeScheme"."ID_PRIZE_SCHEME";

-- AlterTable
CREATE SEQUENCE prizeschemeitem_id_prize_scheme_item_seq;
ALTER TABLE "PrizeSchemeItem" ALTER COLUMN "ID_PRIZE_SCHEME_ITEM" SET DEFAULT nextval('prizeschemeitem_id_prize_scheme_item_seq');
ALTER SEQUENCE prizeschemeitem_id_prize_scheme_item_seq OWNED BY "PrizeSchemeItem"."ID_PRIZE_SCHEME_ITEM";

-- AlterTable
CREATE SEQUENCE prizevalue_id_prize_value_seq;
ALTER TABLE "PrizeValue" ALTER COLUMN "ID_PRIZE_VALUE" SET DEFAULT nextval('prizevalue_id_prize_value_seq');
ALTER SEQUENCE prizevalue_id_prize_value_seq OWNED BY "PrizeValue"."ID_PRIZE_VALUE";

-- AlterTable
CREATE SEQUENCE race_id_race_seq;
ALTER TABLE "Race" ALTER COLUMN "ID_RACE" SET DEFAULT nextval('race_id_race_seq');
ALTER SEQUENCE race_id_race_seq OWNED BY "Race"."ID_RACE";

-- AlterTable
CREATE SEQUENCE raceignorebird_id_ignore_bird_seq;
ALTER TABLE "RaceIgnoreBird" ALTER COLUMN "ID_IGNORE_BIRD" SET DEFAULT nextval('raceignorebird_id_ignore_bird_seq');
ALTER SEQUENCE raceignorebird_id_ignore_bird_seq OWNED BY "RaceIgnoreBird"."ID_IGNORE_BIRD";

-- AlterTable
CREATE SEQUENCE raceitem_id_race_item_seq;
ALTER TABLE "RaceItem" ALTER COLUMN "ID_RACE_ITEM" SET DEFAULT nextval('raceitem_id_race_item_seq');
ALTER SEQUENCE raceitem_id_race_item_seq OWNED BY "RaceItem"."ID_RACE_ITEM";

-- AlterTable
CREATE SEQUENCE racenumbergroup_id_race_number_group_seq;
ALTER TABLE "RaceNumberGroup" ALTER COLUMN "ID_RACE_NUMBER_GROUP" SET DEFAULT nextval('racenumbergroup_id_race_number_group_seq');
ALTER SEQUENCE racenumbergroup_id_race_number_group_seq OWNED BY "RaceNumberGroup"."ID_RACE_NUMBER_GROUP";

-- AlterTable
CREATE SEQUENCE racephantombird_id_race_phantom_bird_seq;
ALTER TABLE "RacePhantomBird" ALTER COLUMN "ID_RACE_PHANTOM_BIRD" SET DEFAULT nextval('racephantombird_id_race_phantom_bird_seq');
ALTER SEQUENCE racephantombird_id_race_phantom_bird_seq OWNED BY "RacePhantomBird"."ID_RACE_PHANTOM_BIRD";

-- AlterTable
CREATE SEQUENCE racetype_id_race_type_seq;
ALTER TABLE "RaceType" ALTER COLUMN "ID_RACE_TYPE" SET DEFAULT nextval('racetype_id_race_type_seq');
ALTER SEQUENCE racetype_id_race_type_seq OWNED BY "RaceType"."ID_RACE_TYPE";

-- AlterTable
CREATE SEQUENCE reportids_id_seq;
ALTER TABLE "ReportIds" ALTER COLUMN "ID" SET DEFAULT nextval('reportids_id_seq');
ALTER SEQUENCE reportids_id_seq OWNED BY "ReportIds"."ID";

-- AlterTable
CREATE SEQUENCE reports_id_report_seq;
ALTER TABLE "Reports" ALTER COLUMN "ID_REPORT" SET DEFAULT nextval('reports_id_report_seq');
ALTER SEQUENCE reports_id_report_seq OWNED BY "Reports"."ID_REPORT";

-- AlterTable
CREATE SEQUENCE rightgrouplines_id_right_group_line_seq;
ALTER TABLE "RightGroupLines" ALTER COLUMN "ID_RIGHT_GROUP_LINE" SET DEFAULT nextval('rightgrouplines_id_right_group_line_seq');
ALTER SEQUENCE rightgrouplines_id_right_group_line_seq OWNED BY "RightGroupLines"."ID_RIGHT_GROUP_LINE";

-- AlterTable
CREATE SEQUENCE rightgroups_id_right_group_seq;
ALTER TABLE "RightGroups" ALTER COLUMN "ID_RIGHT_GROUP" SET DEFAULT nextval('rightgroups_id_right_group_seq');
ALTER SEQUENCE rightgroups_id_right_group_seq OWNED BY "RightGroups"."ID_RIGHT_GROUP";

-- AlterTable
CREATE SEQUENCE standardshowpercentage_id_standard_show_percentage_seq;
ALTER TABLE "StandardShowPercentage" ALTER COLUMN "ID_STANDARD_SHOW_PERCENTAGE" SET DEFAULT nextval('standardshowpercentage_id_standard_show_percentage_seq');
ALTER SEQUENCE standardshowpercentage_id_standard_show_percentage_seq OWNED BY "StandardShowPercentage"."ID_STANDARD_SHOW_PERCENTAGE";

-- AlterTable
CREATE SEQUENCE systemrequirements_id_info_update_seq;
ALTER TABLE "SystemRequirements" ALTER COLUMN "ID_INFO_UPDATE" SET DEFAULT nextval('systemrequirements_id_info_update_seq');
ALTER SEQUENCE systemrequirements_id_info_update_seq OWNED BY "SystemRequirements"."ID_INFO_UPDATE";

-- AlterTable
CREATE SEQUENCE systemupdates_id_system_update_seq;
ALTER TABLE "SystemUpdates" ALTER COLUMN "ID_SYSTEM_UPDATE" SET DEFAULT nextval('systemupdates_id_system_update_seq');
ALTER SEQUENCE systemupdates_id_system_update_seq OWNED BY "SystemUpdates"."ID_SYSTEM_UPDATE";

-- AlterTable
CREATE SEQUENCE tmpavgspeed_id_event_inventory_item_seq;
ALTER TABLE "TmpAvgSpeed" ALTER COLUMN "ID_EVENT_INVENTORY_ITEM" SET DEFAULT nextval('tmpavgspeed_id_event_inventory_item_seq');
ALTER SEQUENCE tmpavgspeed_id_event_inventory_item_seq OWNED BY "TmpAvgSpeed"."ID_EVENT_INVENTORY_ITEM";

-- AlterTable
CREATE SEQUENCE tmpbets_id_race_item_seq;
ALTER TABLE "TmpBets" ALTER COLUMN "ID_RACE_ITEM" SET DEFAULT nextval('tmpbets_id_race_item_seq');
ALTER SEQUENCE tmpbets_id_race_item_seq OWNED BY "TmpBets"."ID_RACE_ITEM";

-- AlterTable
CREATE SEQUENCE tmpid_id_seq;
ALTER TABLE "TmpId" ALTER COLUMN "ID" SET DEFAULT nextval('tmpid_id_seq');
ALTER SEQUENCE tmpid_id_seq OWNED BY "TmpId"."ID";

-- AlterTable
CREATE SEQUENCE userrightgroups_id_user_right_group_seq;
ALTER TABLE "UserRightGroups" ALTER COLUMN "ID_USER_RIGHT_GROUP" SET DEFAULT nextval('userrightgroups_id_user_right_group_seq');
ALTER SEQUENCE userrightgroups_id_user_right_group_seq OWNED BY "UserRightGroups"."ID_USER_RIGHT_GROUP";

-- AlterTable
CREATE SEQUENCE users_id_user_seq;
ALTER TABLE "Users" ALTER COLUMN "ID_USER" SET DEFAULT nextval('users_id_user_seq');
ALTER SEQUENCE users_id_user_seq OWNED BY "Users"."ID_USER";
