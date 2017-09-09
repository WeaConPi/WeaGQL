import { mongoose } from '../mongoose/connection'
import { Document, Model, Schema } from "mongoose";

export class AddressC {
    street: String;
    city: String;
    zip: String;


    constructor(street: String, city: String, zip: String) {
        this.street = street;
        this.city = city;
        this.zip = zip;
    }
}

const schema = new Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
});

export interface IAddress extends Document, AddressC {
}

export interface IAddressModel {
}

export type AddressModel = Model<IAddress> & IAddressModel & IAddress;

export const AddressM: AddressModel = <AddressModel>mongoose.model<IAddress>("Address", schema,'address');


const Address = `
    type Address {
        street: String,
        city: String,
        zip: String,
    } 
    input AddressInput {
        street: String,
        city: String,
        zip: String,
    }
`;
export default () => [Address]