import 'dotenv/config';

export const url = process.env.ENV === "PROD" ? "libsql://..." : "file:local.db";
export const authToken = process.env.ENV === "PROD" ? "" : "";