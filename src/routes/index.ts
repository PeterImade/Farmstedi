


// Routes 
import userRoutes from "../user/user.route";
import { Express} from "express"


export default function routes(app: Express)
{
    userRoutes(app)
}