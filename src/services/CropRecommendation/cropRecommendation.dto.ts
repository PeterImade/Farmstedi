
// Create User REQ DTO
export interface RecommendPlants_Req
{
   longitude: number,
   latitude: number, 
   soilType: string, 
   area?: number, 
   plants: string[] 
}
