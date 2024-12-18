

// Create User REQ DTO
export interface CreateUser_REQ_DTO 
{
    firstname: string, 
    lastname: string, 
    password: string, 
    email: string 
}


// Signin REQ DTO 
export interface Signin_REQ_DTO 
{
    email: string, 
    password: string 
}

// Signin RES DTO
export interface Signin_RES_DTO 
{
    _id: string,
    firstname: string, 
    lastname: string, 
    tokens:
    {
        accessToken: string,
        refreshToken: string 
    }
}