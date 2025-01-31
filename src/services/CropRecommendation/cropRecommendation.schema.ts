import { z } from "zod";

export const CropRecommendationSchema = z.object({

                    body: z.object(
                        {

                                longitude: z.number({
                                                        required_error: "longitude not provided",
                                                        invalid_type_error: "longitude must be a float",
                                                    }),
                                latitude:  z.number({
                                                        required_error: "latitude not provided",
                                                        invalid_type_error: "latitude must be a float",
                                                    }),
                                plants: z.array(z.string(), {
                                                        required_error: "plants must be an array of strings",
                                                        invalid_type_error: "plants must be an array of strings",
                                                    }),
                                area: z.number( 
                                                    {
                                                        invalid_type_error:"area must be a number" 
                                                    }
                                              )
                                              .optional(),
                                soilType: z.string
                                            (
                                                {
                                                    required_error: "soilType Must be provided",
                                                    invalid_type_error:"soilType must be of type String" 
                                                }
                                            )
                    }
                )
});

export type CropRecommendationReqSchema = z.infer<typeof CropRecommendationSchema>;
