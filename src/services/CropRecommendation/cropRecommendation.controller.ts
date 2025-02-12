/*** MODULES ***/

// Server 
import { NextFunction, Request, Response} from "express"

// Modules 
import { CropRecommendationService } from "./cropRecommendation.service"
import { CropRecommendationReqSchema } from "./cropRecommendation.schema"


export default class CropRecommendationController 
{

    private cropRecommendationService: CropRecommendationService 

    constructor()
    {
        this.cropRecommendationService = new CropRecommendationService() 
    }


    async recommendCrops
    (
        req: Request<{},{},CropRecommendationReqSchema['body']>, 
        res: Response, 
        next: NextFunction 
    )
    {
        try 
        {
            // Set timeout 
            res.setTimeout(100000)
            const farmData = req.body
            const plantRecommendations = await this.cropRecommendationService.recommendCropsToPlant( farmData ) 
            
            res.send( plantRecommendations )
            // res.status(200).json({ success: true, data:{  plantRecommendations }})
            return 
        }
        catch(e: any)
        {
            next(e) 
        }
    }

}