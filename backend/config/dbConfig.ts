import dotenv from "dotenv";
import knex from "knex";
import { fileURLToPath } from "node:url";
import path from "path";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const dbConfig = knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || "5432")
    }
});

async function testConnection() {
    console.log("Variables d'environnement chargées :", {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
    try {
        await dbConfig.raw("SELECT 1+1 as result");
    } catch (error) {
        console.error("Erreur de connexion :", error);
    }
}

testConnection();

export default dbConfig;
