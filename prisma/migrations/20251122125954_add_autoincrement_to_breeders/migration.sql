-- AlterTable
CREATE SEQUENCE breeders_id_breeder_seq;
ALTER TABLE "Breeders" ALTER COLUMN "ID_BREEDER" SET DEFAULT nextval('breeders_id_breeder_seq');
ALTER SEQUENCE breeders_id_breeder_seq OWNED BY "Breeders"."ID_BREEDER";
