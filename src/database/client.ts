import { createClient } from "@libsql/client";

const client = createClient({
    url: "libsql://...",
    authToken: "...",
});

export default client;