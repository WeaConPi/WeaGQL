import Building, { BuildingM } from './Building';
import {
  addResolveFunctionsToSchema,
  makeExecutableSchema,
} from 'graphql-tools';
import { AddressM } from './Address';
import Day, { DayM, DayResolver } from './Day';
import { updateDay } from '../service/DayService';

const RootQuery = `
 type RootQuery {
    buildings:[Building]
    addresses:[Address]
    days(buildingId : String, page: Int, pageSize:Int) :DayPaginated
    day(buildingId : String, date: String) :Day
 }
`;
const RootMutation = `
 type RootMutation {
    insertBuilding( building: BuildingInput! ): Building
    upsertNoteForDay( dayId: String!, note: String ): Day
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
      return await BuildingM.find({});
    },
    async addresses() {
      return await AddressM.find();
    },
  },
  RootMutation: {
    async insertBuilding(_, { building }) {
      try {
        return await BuildingM.create(building);
      } catch (a) {
        throw new Error('something went wrong ' + a);
      }
    },
    async upsertNoteForDay(_, { dayId, note }) {
      try {
        return await updateDay(dayId, note);
      } catch (a) {
        throw new Error('something went wrong ' + a);
      }
    },
  },
};
const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, Building, Day],
  resolvers: resolvers,
});
addResolveFunctionsToSchema(schema, DayResolver);
export default schema;
