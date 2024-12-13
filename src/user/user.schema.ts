
import { z } from "zod"


export const CreateUserSchema = z.object
(
    {
        body: z.object
            (
                {
                    firstname:  z.string
                    (
                        {
                            required_error:"firstname required",
                            invalid_type_error: "firstname must be of type string",   
                        }
                    )
                    .min(2,"letters in firstname cannot be less than 2")
                    .max(70,"letters in firstname cannot be more that 70"), 

                    lastname:  z.string
                    (
                        {
                            required_error:"lastname required",
                            invalid_type_error: "lastname must be of type string",   
                        }
                    )
                    .min(2,"letters in lastname cannot be less than 2")
                    .max(70,"letters in lastname cannot be more that 70"),

                    email:  z.string
                    (
                        {
                            required_error:"email required",
                            invalid_type_error: "email must be of type string",   
                        }
                    )
                    .email("invalide email")
                    .min(5,"letters in firstname cannot be less than 2")
                    .max(50,"letters in firstname cannot be more that 50"),
                    
                    password:  z.string
                    (
                        {
                            required_error:"password required",
                            invalid_type_error: "password must be of type string",   
                        }
                    )
                    .min(5,"password characters cannot be less than 2")
                    .max(70,"password characters cannot be more that 70"),

                    confirmPassword:  z.string
                    (
                        {
                            required_error:"confirm password required",
                            invalid_type_error: "confirm password must be of type string",   
                        }
                    )
                    .min(5,"confirmPassword characters cannot be less than 5")
                    .max(70,"confirmPassword characters cannot be greater than 70")
                }
            )
            .refine( data => data.password === data.confirmPassword, { message:"passwords don't match", path: ["confirmPassword"] })
    }
)


export const SigninSchema = z.object
(
    {
        body: z.object
                (
                    {
                        email: z.string
                            (
                                { 
                                    required_error:"email required",
                                    invalid_type_error:"email must be of type string"
                                }
                            )
                            .email("must be a valid email"),

                        password: z.string  
                            (
                                {
                                    required_error: "password required",
                                    invalid_type_error: "password must be of type string" 
                                }
                            )
                            .min(2) 
                    }
                )
    }
)


export type CreateUserRequestSchema = z.infer<typeof CreateUserSchema>
export type SigninRequestSchema = z.infer<typeof SigninSchema> 