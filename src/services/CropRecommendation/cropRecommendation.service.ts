
import {  config } from "dotenv"
import { fetchHistoricalWeatherData, predictFutureWeather } from "../../utils/cropRecommendation/nasaPow/fetchWeatherData"
import { GoogleGeminiClient } from "../../../genAI/models/gemini/gemini"
import { RecommendPlants_Req } from "./cropRecommendation.dto"
config() 


export class CropRecommendationService
{
    private plantRecommendationModel: GoogleGeminiClient

    constructor()
    {
        this.plantRecommendationModel = new GoogleGeminiClient() 
    }

    async recommendCropsToPlant( farmData: RecommendPlants_Req )
    {
        try 
        {
            const { longitude, latitude, area, plants, soilType } = farmData

            // Fetch Historical Weather Data 
            const historicWeatherData = await  fetchHistoricalWeatherData(longitude, latitude)
            
            // Ensure Data Valid 
            if( !historicWeatherData ){ return }

            // Predict Future Temperature 
            const { predictedTemperature, predictedPrecipitation} = predictFutureWeather( historicWeatherData )

            // Display Predicted Temperature 
            console.log(`The predicted temperature for Long:${longitude} and Lat:${latitude} is: ${ predictedTemperature } *C`)
            console.log(`The predicted precipitation for Long:${longitude} and Lat:${latitude} is: ${ predictedPrecipitation} *C`)

            // Generate AI Recommendations Based on {User Provided Data} and {Temperature & Precipitation  Data}
            
            const taskDescription = "Generating Plant Recommendation"
            const systemMessage = `Your Role: You are an intelligent AI system that takes an array of JSON input of the structure:
            [ 
                {
                    "longitude": ${ longitude},
                    "latitude": ${ latitude },
                    "temperature": ${ predictedTemperature }°C,
                    "soilType": ${ soilType },
                    "plants": ${ plants }
                }
            ]

            And then Analyzes each plant object in the given array seperately to determine if it is suitable to plant.
            Note: Each of the plant provided in the input array must have it's own seperate object in the output array
            Note: Your Response must be 100% JSON. 
            Important: do not add """json """ to the output
            Your Response will be strictly in JSON format, following this structure: 
            { recommendations: [{
                "plantName": "plant name here",
                "temperature":
                {
                    "score": 1-5, // 5 being the best score
                    "msg":" your message about the temperature condition for the plant"
                },
                "location":
                {
                    "score": 1-5, // 5 being the best score
                    "msg":" your message about the location of which the plant is intended to be cultivated" 
                },
                "soil":
                {
                    "score": 1-5, // 5 being the best score
                    "msg":" your message about the soil of which the plant is intended to be cultivated "
                },
                "economics":
                {
                    "msg":" your message about the economics of the plant " 
                }
            }
            ] }
            `
            const humanMessage = `
            {
                "longitude": ${ longitude},
                "latitude": ${ latitude },
                "temperature": ${ predictedTemperature }°C,
                "soilType": ${ soilType },
                "plants": ${ plants }
            }
            
            `

            const plantRecommendations = await this.plantRecommendationModel.generateRecommendations( taskDescription, systemMessage, humanMessage) 
            function extractJson( text: string ) {
                const match = text.match(/```json\s*([\s\S]*?)\s*```/);
                return match ? match[1] : "";
              }

            var res = extractJson( plantRecommendations)
            res = JSON.parse( res ) 
            console.log( typeof res)
            console.log( res )
            return res
        }   
        catch(e: any)
        {
            console.log("Service: Could Not Recommend Crop to plant") 
            console.log(e) 
            throw(e) 
        }
    }


    // plants provided, determine optimal temperature ranges 
    // also determine precipitation amount 
    // Analyse Historic Temperature 
    // Determine If Temperature Okay 
    // Suggest other plants that go with the temperature

}