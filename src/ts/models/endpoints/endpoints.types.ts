import { Document, Model } from "mongoose";

export interface IEndpoint {
    lat: number;
    lon: number;
    label: string;
}

export interface IEndpointDocument extends IEndpoint, Document {}

export interface IEndpointModel extends Model<IEndpointDocument> {}