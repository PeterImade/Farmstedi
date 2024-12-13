

// Modules 
import { config } from "dotenv"
config() 
import Redis from "ioredis";

const REDIS_HOST: string = process.env.REDIS_HOST || ""
const REDIS_PORT: number = parseInt( process.env.REDIS_PORT as string ) || 6379


const redisClient = new Redis
    (
        {
            host: REDIS_HOST,
            port: REDIS_PORT 
        }
    )


export default redisClient