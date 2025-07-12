export const options = {
  host: "localhost",
  port: 3050,
  database: process.env.FIREBIRD_PATH, // 🔁 Update this path
  user: "SYSDBA",
  password: "masterkey",
  lowercase_keys: false,
  role: null,
  pageSize: 4096,
};
