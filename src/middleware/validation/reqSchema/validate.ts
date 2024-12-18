

import { Request, Response, NextFunction } from "express"
import { AnyZodObject, ZodError} from "zod"
import extractZodErrors from "../../../utils/errors/zod/extractSchemaErrors"


export default function validateRequestSchema( schema: AnyZodObject )
{
    return (req: Request, res: Response, next: NextFunction)=>{
        try 
        {
            const { body, params, query} = req

            // Validate Request Schema 
            schema.parse
            (
                {
                    body,
                    params,
                    query
                }
            )

            // No Schema Error, Call next middleware 
            next() 
            return 
        }
        catch(e: any)
        {

            if( e instanceof ZodError )
            {
                console.log("Schema Error ")

                const errors = extractZodErrors(e) 
                res.status(400).json({ success: false, errors })
                return 
            }

                res.status(500).json({ success: false, msg:"server error" })
                return
        }
    }
}