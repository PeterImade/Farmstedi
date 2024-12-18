

/*** MODULES ***/

// Server 
import { Express } from "express"
import { Router } from "express"

// Controller
import UserController from "./user.controller"
import validateRequestSchema from "../middleware/validation/reqSchema/validate"
import { CreateUserSchema, SigninSchema } from "./user.schema"

const router = Router() 

export default function userRoutes( app: Express )
{
    try 
    {
        const userController = new UserController() 

        // User Signup 
        router.post
        (
            "/auth/signup",
            validateRequestSchema(CreateUserSchema),
            userController.create.bind( userController )
        )

        // User Signin
        router.post
        (
            "/auth/signin",
            validateRequestSchema( SigninSchema ),
            userController.signin.bind( userController ) 
        )

              // User Signin
        router.post
        (
            "/auth/signout",
            userController.signout.bind( userController ) 
        )
      


        app.use('/api/v1', router )
    }
    catch(e: any)
    {
        console.log("Error Occured While Creating User Routes") 
        console.log(e) 
    }
}