import { mongoose } from '../mongoose/connection'
import { Document, Model, Schema } from "mongoose";

export class BuildingC {
    name: String;
    info: String;

    constructor(name: String, info: String) {
        this.name = name;
        this.info = info;
    }
}

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
});

export interface IBuilding extends Document, BuildingC {
}

export interface IBuildingModel {
}

export type BuildingModel = Model<IBuilding> & IBuildingModel & IBuilding;

export const BuildingM: BuildingModel = <BuildingModel>mongoose.model<IBuilding>("Building", schema);


const Building = `
    type Building {
        name:String,
        info:String,
    } 
    input BuildingInput {
        name:String,
        info:String,
    }
`;
export default () => [Building]