

import { ServerError } from "../../utils/errors/server/500Error";
import { BadRequestError } from "../../utils/errors/server/400Error";



export type AnyAppError = ServerError | BadRequestError