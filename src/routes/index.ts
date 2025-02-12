


// Routes 
import userRoutes from "../user/user.route";
import cropRecommendationRoutes from "../services/CropRecommendation/cropRecommendation.route";
import { Express} from "express"


export default function routes(app: Express)
{
    userRoutes(app)
    cropRecommendationRoutes(app) 
}