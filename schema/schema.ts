import Building, { BuildingM } from './Building'
import { makeExecutableSchema, } from 'graphql-tools'
import { AddressM } from "./Address";

const RootQuery = `
 type RootQuery {
    buildings:[Building]
    addresses:[Address]
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
                const insertedHome = await BuildingM.create(building);
                return insertedHome;
            }
            catch (a) {
                throw new Error("something went wrong " + a)
            }
        },

    }
};
export default makeExecutableSchema({
    typeDefs: [SchemaDefinition, RootQuery, RootMutation, Building],
    resolvers: resolvers,
});