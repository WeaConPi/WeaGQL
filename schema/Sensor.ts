import { mongoose } from '../mongoose/connection';
import { Document, Model, Schema } from 'mongoose';

export class SensorC {
  type?: String;
  unit?: String;
  value?: String;
  sensor_name?: String;
  sensor_type?: String;

  constructor(
    type: String,
    unit: String,
    value: String,
    sensor_name: String,
    sensor_type: String,
  ) {
    this.type = type;
    this.unit = unit;
    this.value = value;
    this.sensor_name = sensor_name;
    this.sensor_type = sensor_type;
  }
}

const schema = new Schema({
  name: {
    type: String,
    required: false,
  },
  unit: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  sensor_name: {
    type: String,
    required: false,
  },
  sensor_type: {
    type: String,
    required: false,
  },
});

export interface ISensor extends Document, SensorC {}

export interface ISensorModel {}

export type SensorModel = Model<ISensor> & ISensorModel & ISensor;

export const SensorM: SensorModel = <SensorModel>mongoose.model<ISensor>(
  'Sensor',
  schema,
  'sensor',
);

const Sensor = `
    type Sensor {
        type:String,
        unit:String,
        value:String,
        sensor_name:String,
        sensor_type:String,
    } 
`;
export default () => [Sensor];
