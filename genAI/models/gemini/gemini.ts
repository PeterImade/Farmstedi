
import { config} from "dotenv"
config() 

import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { HumanMessage, SystemMessage, AIMessage} from "@langchain/core/messages"


export class GoogleGeminiClient
{


    private llm: ChatGoogleGenerativeAI

    constructor()
    {
        this.llm = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
            temperature: 0.5,
            maxRetries: 2,
            maxOutputTokens: 2048,
            apiKey: process.env.GOOGLE_GEN_AI_KEY
          })
    }


    async generateRecommendations(  prompt: string ): Promise<any>
    {
        try 
        {

                const recommendations = await this.llm.invoke( prompt)
                return recommendations.content
        }
        catch(e: any)
        {
            console.log("Google Gemini Error ")
            console.error(e) 
            throw e 
        }
    }
}