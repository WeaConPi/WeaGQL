import { mongoose } from '../mongoose/connection'
import { Document, Model, Schema } from "mongoose";
import { BuildingM, default as Building } from './Building'
import Hour, { HourC, HourM } from "./Hour";

export class DayC {
    _id: String;
    date: Date;
    note: String;
    buildingId: String;
    hours: [HourC]
}

const schema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    note: {
        type: String,
        required: false,
    },
    buildingId: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    _id: {
        type: Schema.Types.ObjectId,
        required: false,
    },
});

export interface IDay extends Document, DayC {
}

export interface IDayModel {
}

export type DayModel = Model<IDay> & IDayModel & IDay;

export const DayM: DayModel = <DayModel>mongoose.model<IDay>("Day", schema, 'day');


const Day = `
    type Day{
        date:String,
        note:String,
        building:Building,
        hours(dayId: String):[Hour]
    }
     type DayPaginated{
        page:Int,
        pageSize:Int,
        content:[Day]
    } 
`;
export const DayResolver = {
    RootQuery: {
        async days(_, {buildingId, page, pageSize}) {
            return await {
                page,
                pageSize,
                content: DayM.find({buildingId}, {}, {skip: pageSize * page, limit: pageSize})
            };
        },
        async day(_, {buildingId, date}) {
            return await DayM.find({buildingId, date});
        },
    },
    Day: {
        async building(day: DayC) {
            return await BuildingM.findOne({_id: day.buildingId});
        },
        async hours(day: DayC) {
            return await HourM.find({dayId: day._id});
        },
    }
};
export default () => [Day, Building, Hour]