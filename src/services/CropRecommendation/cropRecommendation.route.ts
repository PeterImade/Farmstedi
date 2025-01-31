/*** MODULES ***/

// Server 
import { Express } from "express"
import { Router } from "express"

// Controller
import CropRecommendationController from "./cropRecommendation.controller"

// Schema 
import { CropRecommendationSchema } from "./cropRecommendation.schema"
import validateRequestSchema from "../../middleware/validation/reqSchema/validate"

const router = Router() 

export default function cropRecommendationRoutes( app: Express )
{
    try 
    {
        const cropRecommendationController = new CropRecommendationController() 


        // Crop Recommendations
        router.post
        (
            "/recommendations",
            validateRequestSchema( CropRecommendationSchema ),
            cropRecommendationController.recommendCrops.bind( cropRecommendationController )
        )

        app.use('/api/v1/crop', router )
    }
    catch(e: any)
    {
        console.log("Error Occured While Creating Crop Recommendation Routes") 
        console.log(e) 
    }
}