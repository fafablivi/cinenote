import knex from "knex";
import * as dotenv from "dotenv";
dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT as string, 10),
  },
});

export async function testConnection() {
  try {
    await db.raw("SELECT 1+1 as result");
  } catch (error) {
    console.error("Erreur de connexion :", error);
  }
}

testConnection();

export default db;
