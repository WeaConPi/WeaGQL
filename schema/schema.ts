import Building, { BuildingM } from './Building'
import { makeExecutableSchema, } from 'graphql-tools'
import { AddressM } from "./Address";
import Day, { DayResolver } from "./Day";

const RootQuery = `
 type RootQuery {
    buildings:[Building]
    addresses:[Address]
    days(buildingId : String, page: Int, pageSize:Int) :DayPaginated
    day(buildingId : String, date: String) :[Day]
 }
`;
const RootMutation = `
 type RootMutation {
    insertBuilding( building: BuildingInput! ): Building
 }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;
const resolvers = {
    RootQuery: {
        async buildings() {
            return await BuildingM.find();
        },
        async addresses() {
            return await AddressM.find();
        },


    },
    RootMutation: {
        async insertBuilding(_, {building}) {
            try {
                return await BuildingM.create(building);
            }
            catch (a) {
                throw new Error("something went wrong " + a)
            }
        },


    }
};
export default makeExecutableSchema({
    typeDefs: [SchemaDefinition, RootQuery, RootMutation, Building, Day],
    resolvers: {...resolvers, ...DayResolver},
});