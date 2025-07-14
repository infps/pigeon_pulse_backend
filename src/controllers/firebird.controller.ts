import type { Request, Response } from "express";
import { options } from "../lib/firebird";
const Firebird = require("node-firebird");
export const fetchRaceItemResult = async (req: Request, res: Response) => {
  Firebird.attach(options, (err: any, db: any) => {
    if (err) {
      console.error("🔥 DB Connection Error:", err);
      res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
      return;
    }

    // Run query
    db.query(
      `SELECT ID_RACE_ITEM, BIRD_POSITION, ARRIVAL_TIME, BIRD_DROP, PRIZE_VALUE FROM RACE_ITEM_RESULT ORDER BY ARRIVAL_TIME ROWS 1 TO 20`,
      (err: any, result: any) => {
        db.detach(); // Close the DB connection

        if (err) {
          console.error("❌ Query Error:", err);
          return res.status(500).send("Query failed");
        }
        res.json({ message: "Data fetched successfully", data: result });
        return;
      }
    );
  });
};

export const fetchBreeders = async (req: Request, res: Response) => {
  Firebird.attach(options, (err: any, db: any) => {
    if (err) {
      console.error("🔥 DB Connection Error:", err);
      res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
      return;
    }

    // Run query
    db.query(
      `SELECT ID_BREEDER, STATUS, FIRST_NAME,LAST_NAME,COUNTRY,SOCIAL_SECURITY_NUMBER,TAX_NUMBER,ADDRESS_1,CITY_1,STATE_1,ZIP_1,PHONE,CELL,FAX,SMS,EMAIL,EMAIL_2,WEB_ADDRESS FROM BREEDERS ROWS 1 TO 20`,
      (err: any, result: any) => {
        db.detach(); // Close the DB connection

        if (err) {
          console.error("❌ Query Error:", err);
          return res.status(500).send("Query failed");
        }
        res.json({ message: "Data fetched successfully", data: result });
        return;
      }
    );
  });
};

export const fetchRaceResult = async (req: Request, res: Response) => {
  Firebird.attach(options, (err: any, db: any) => {
    if (err) {
      console.error("🔥 DB Connection Error:", err);
      res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
      return;
    }

    // Run query
    db.query(
      `SELECT RACE_NUMBER,LOCATION,DISTANCE,START_TIME,SUNRISE,SUNSET FROM RACE ROWS 1 TO 20`,
      (err: any, result: any) => {
        db.detach(); // Close the DB connection

        if (err) {
          console.error("❌ Query Error:", err);
          return res.status(500).send("Query failed");
        }
        res.json({ message: "Data fetched successfully", data: result });
        return;
      }
    );
  });
};

export const fetchEventInventory = async (req: Request, res: Response) => {
  Firebird.attach(options, (err: any, db: any) => {
    if (err) {
      console.error("🔥 DB Connection Error:", err);
      res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
      return;
    }

    // Run query
    db.query(
      `SELECT
  ei.LOFT,
  eii.BIRD_NO,
  ei.ID_BREEDER AS BREEDER,
  ei.SIGN_IN_DATE,
  ei.IS_WAITING AS WAITING,
  ei.WAITING_DATE,
  ei.RESERVED_BIRDS,
  eii.PERCH_FEE_VALUE,
  (
    SELECT COUNT(*)
    FROM EVENT_INVENTORY_ITEM eii2
    WHERE eii2.ID_EVENT_INVENTORY = ei.ID_EVENT_INVENTORY
  ) AS BIRDS_IN_LOFT
FROM
  EVENT_INVENTORY ei
JOIN
  EVENT_INVENTORY_ITEM eii ON ei.ID_EVENT_INVENTORY = eii.ID_EVENT_INVENTORY ROWS 1 TO 20
`,
      (err: any, result: any) => {
        db.detach(); // Close the DB connection

        if (err) {
          console.error("❌ Query Error:", err);
          return res.status(500).send("Query failed");
        }
        res.json({ message: "Data fetched successfully", data: result });
        return;
      }
    );
  });
};

export const fetchEvents = async (req: Request, res: Response) => {
  Firebird.attach(options, (err: any, db: any) => {
    if (err) {
      console.error("🔥 DB Connection Error:", err);
      res.status(500).json({
        message: "Database connection failed",
        error: err.message,
      });
      return;
    }

    // Run query
    db.query(
      `SELECT ID_EVENT,EVENT_NAME,EVENT_SHORT_NAME,EVENT_DATE FROM EVENTS`,
      (err: any, result: any) => {
        db.detach(); // Close the DB connection

        if (err) {
          console.error("❌ Query Error:", err);
          return res.status(500).send("Query failed");
        }
        res.json({ message: "Data fetched successfully", data: result });
        return;
      }
    );
  });
};
