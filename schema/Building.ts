import { mongoose } from '../mongoose/connection'
import { Document, Model, Schema } from "mongoose";
import Address,{ AddressC, AddressM } from "./Address";

export class BuildingC {
    name: String;
    info: String;
    address: AddressC;


    constructor(name: String, info: String, address: AddressC) {
        this.name = name;
        this.info = info;
        this.address = address;
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
    address: {
        type: Schema.Types.Mixed,
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
        address:Address,
    } 
    input BuildingInput {
        name:String,
        info:String,
        address:AddressInput,
    }
`;
export default () => [Building,Address]