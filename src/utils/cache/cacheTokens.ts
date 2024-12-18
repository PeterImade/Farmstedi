

import { config } from "dotenv"
config() 
import redisClient from "../../system/redis/redis";
import jwt from "jsonwebtoken"


const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || ""
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "" 



export default class TokenService{

    private static ACCESS_TOKEN_PREFIX = 'access_token'
    private static REFRESH_TOKEN_PREFIX = 'refresh_token' 


    /**
     * Cache Access Token 
     * @params userId User unique Id
     * @params token Issued Access Token 
     * @params expiresIn token expiration time in seconds 
     */

    static async cacheAccessToken
    (
        userId: string, 
        token: string
    )
    {
        try 
        {
            const key = `${ this.ACCESS_TOKEN_PREFIX }${userId}`
            const expiresIn = process.env.REDIS_ACCESS_TOKEN_EXP  || 3600
            await redisClient.set(key, token, 'EX', expiresIn )
        }
        catch(e: any)
        {
            console.log(e) 
            throw e 
        }
    }


    /**
     * Verifies Access Token 
     * @params userId User's unique Identifier 
     * @params token JWT token to verify 
     */
    static async validateAccessToken
    (
        userId: string, 
        token: string 
    )
    {
        const key = `${this.ACCESS_TOKEN_PREFIX}${userId}`
        const cachedToken = await redisClient.get(key)

        if( !cachedToken ) return false 

        if( cachedToken !== token ) return false 


        try 
        {
            const decoded = await jwt.verify( token , JWT_ACCESS_TOKEN_SECRET )
            return decoded
        }
        catch(e: any)
        {
            return false 
        }

    }


    /**
     * Cache Refresh Token 
     * @params userId: User's uniqueId 
     * @params token: User's refresh token 
     * @params expiresIn: Time in seconds for token to expire 
     */

    static async cacheRefreshToken
    (
        userId: string, 
        token: string
    )
    {
        try 
        {
            const key = `${this.REFRESH_TOKEN_PREFIX}${userId}`
            const expiresIn = process.env.REDIS_REFRESH_TOKEN_EXP || 3600
            await redisClient.set(key,token,'EX',expiresIn)
        }
        catch(e: any) 
        {
            throw e 
        }
    }

    /**
     * Validate Refresh Token 
     * @params userId: Unique UserId 
     * @params token: Refresh Token 
     */

    static async validateRefreshToken
    (
        userId: string, 
        token: string 
    ): Promise<boolean> 
    {
        try 
        {
            const key = `${this.REFRESH_TOKEN_PREFIX}${userId}`
            const exists = await redisClient.exists(key) 

            return exists === 1 
        }
        catch(e: any)
        {
            throw e
        }
    }


    /**
     * Invalidate Token 
     * @ userId: Unique User Id 
     * @ token: Access or Refresh Token 
     * @ isRefreshToken: (optional) set to true if token is refresh token 
     */

    static async invalidateToken
    (
        userId: string, 
        token: string, 
        isRefreshToken: boolean = false 
    )
    {
        const prefix = isRefreshToken?  this.REFRESH_TOKEN_PREFIX : this.ACCESS_TOKEN_PREFIX
        const key = `${prefix}${userId}`
        
        await redisClient.del(key)
    }

    
}