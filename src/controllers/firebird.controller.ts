import type { Request, Response } from "express";
import { options } from "../lib/firebirdConfig";
const Firebird = require("node-firebird");
export const fetchFirebirdData = async (req: Request, res: Response) => {
  Firebird.attach(options, (err:any, db:any) => {
    if (err) {
      console.error("🔥 DB Connection Error:", err);
      res.status(200).json({
        message: "Database connection failed",
        error: err.message,
      });
      return;
    }

    // Run query
    db.query(
      `SELECT ID_RACE_ITEM, BIRD_POSITION, ARRIVAL_TIME, BIRD_DROP, PRIZE_VALUE FROM RACE_ITEM_RESULT ORDER BY ARRIVAL_TIME ROWS 1 TO 10`,
      (err:any, result:any) => {
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
