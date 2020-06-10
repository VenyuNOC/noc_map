import { model } from "mongoose";
import { IEndpointDocument } from "./endpoints.types";
import EndpointSchema from "./endpoints.schema";

export const EndpointModel = model<IEndpointDocument>("endpoint", EndpointSchema);