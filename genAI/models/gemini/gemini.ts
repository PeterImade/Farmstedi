
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


    async generateRecommendations( taskDescription: string, systemMessage: string, humanMessage: string ): Promise<any>
    {
        try 
        {
                console.log( taskDescription) 

                const s_message = new SystemMessage({ content: systemMessage })
                const h_message = new HumanMessage({ content: humanMessage})

                const recommendations = await this.llm.invoke([
                                    s_message,
                                    h_message
                                ])
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