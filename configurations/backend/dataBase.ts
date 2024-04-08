import { Client } from "pg";

const client = new Client({
    host:"postgres",
    user:"admin",
    password:"1234",
    port: 5433,
    database: "postgres"
});

export default client;