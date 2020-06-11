import { Schema } from "mongoose";

const EndpointSchema = new Schema({
    lat: Number,
    lon: Number,
    label: String
});

export default EndpointSchema;