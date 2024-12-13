


export default function extractZodErrors( e: any )
{
           // Extract Errors From Error Object 
           var errs: string[] = [] 
           e.errors.forEach((e: any)=>{  errs.push(e.message) })
           return errs 
}