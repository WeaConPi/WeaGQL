import { mongoose } from '../mongoose/connection'
import { Document, Model, Schema } from "mongoose";
import Sensor, { SensorC, SensorM } from "./Sensor";
import Prediction, { PredictionC, PredictionM } from "./Prediction";
import Forecast, { ForecastC, ForecastM } from "./Forecast";

export class HourC {
    number: number;
    sensors: [SensorC];
    prediction: PredictionC;
    forecast: ForecastC;

    constructor(number: number, sensors: [SensorC], prediction: PredictionC, forecast: ForecastC) {
        this.number = number;
        this.sensors = sensors;
        this.prediction = prediction;
        this.forecast = forecast;
    }
}

const schema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    sensors: {
        type: [Schema.Types.Mixed],
        required: false,
    },
    prediction: {
        type: Schema.Types.Mixed,
        required: false,
    },
    forecast: {
        type: Schema.Types.Mixed,
        required: false,
    },
});

export interface IHour extends Document, HourC {
}

export interface IHourModel {
}

export type HourModel = Model<IHour> & IHourModel & IHour;

export const HourM: HourModel = <HourModel>mongoose.model<IHour>("Hour", schema, 'hour');


const Hour = `
    type Hour {
        number:Int,
        sensors:[Sensor],
        prediction:Prediction,
        forecast:Forecast,
    } 
`;
export default () => [Hour, Sensor, Prediction, Forecast]