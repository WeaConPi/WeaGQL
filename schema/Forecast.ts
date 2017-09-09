import { mongoose } from '../mongoose/connection';
import { Document, Model, Schema } from 'mongoose';

export class ForecastC {
  temperature: number;
  pressure: number;
  humidity: number;

  constructor(temperature: number, pressure: number, humidity: number) {
    this.temperature = temperature;
    this.pressure = pressure;
    this.humidity = humidity;
  }
}

const schema = new Schema({
  temperature: {
    type: Number,
    required: false,
  },
  pressure: {
    type: Number,
    required: false,
  },
  humidity: {
    type: Number,
    required: false,
  },
});

export interface IForecast extends Document, ForecastC {}

export interface IForecastModel {}

export type ForecastModel = Model<IForecast> & IForecastModel & IForecast;

export const ForecastM: ForecastModel = <ForecastModel>mongoose.model<
  IForecast
>('Forecast', schema, 'forecast');

const Forecast = `
    type Forecast {
        temperature:Int,
        pressure:Int,
        humidity:Int,
    } 
`;
export default () => [Forecast];
