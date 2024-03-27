import 'dotenv/config'

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { url, authToken } from "./consts";

const turso = createClient({
    url,
    authToken,
});

export const db = drizzle(turso);
