/**
 * Dependencies
 */
import express, { Request, Response } from "express";
import { db } from "./database/db";
import { users } from "./database/schema/user";
import { eq } from "drizzle-orm";
import bodyValidator from "./middleware/bodyValidator/bodyValidator";
import { User } from "./middleware/bodyValidator/schemasValidators/user.schema";



/**
 * App instance
 */
const app = express();
app.use(express.json());

/**
 * Remove powered by
 */
app.disable("x-powered-by");

/**
 * Configure cors
 */
// app.use(cors())

/**
 * Setup ping endpoint
 */
app.get("/ping", (_: Request, res: Response) => res.json("pong"));

/**
 * Setup routes
 */

app.post("/users", bodyValidator(User), async (req: Request, res: Response) => {
    console.log("POST /users")

    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({ message: "name and email are required" })
    }

    await db.insert(users).values({ name, email })

    res.status(200).json({ message: "ok" })
});

app.get("/users", async (req: Request, res: Response) => {
    res.json(await db.select().from(users))
})

app.get("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const [user] = await db.select().from(users).where(eq(users.id, Number(id))).limit(1)

    if (!user) return res.status(404).json({ message: "user not found" })

    res.json(user)
})




/**
 * Setup server
 */
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
    console.log("🌐 API listening at http://localhost:%s", PORT);
});

export default app;
