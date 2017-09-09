import { mongoose } from '../mongoose/connection'
import { Document, Model, Schema } from "mongoose";

export class PredictionC {
    heat: number;
    blinders: number;
    windows: number;

    constructor(heat: number, blinders: number, windows: number) {
        this.heat = heat;
        this.blinders = blinders;
        this.windows = windows;
    }
}

const schema = new Schema({
    heat: {
        type: String,
        required: false,
    },
    blinders: {
        type: String,
        required: false,
    },
    windows: {
        type: String,
        required: false,
    },
});

export interface IPrediction extends Document, PredictionC {
}

export interface IPredictionModel {
}

export type PredictionModel = Model<IPrediction> & IPredictionModel & IPrediction;

export const PredictionM: PredictionModel = <PredictionModel>mongoose.model<IPrediction>("Prediction", schema, 'Prediction');


const Prediction = `
    type Prediction {
        heat:String,
        blinders:String,
        windows:String,
    } 
`;
export default () => [Prediction]