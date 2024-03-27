import { RequestHandler } from "express";
import { z } from "zod"

function bodyValidator(schema: z.ZodObject<any>): RequestHandler {
    return async (req, res, next) => {
        const { body } = req;

        try {
            schema.parse(body);
            return next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    errors: error
                })
            }
            return res.status(500).json({
                success: false,
                errors: error
            })
        }
    };
}

export default bodyValidator;