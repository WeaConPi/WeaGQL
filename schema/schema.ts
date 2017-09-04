import Building, { BuildingM } from './Building'
import { makeExecutableSchema } from 'graphql-tools'

const RootQuery = `
 type RootQuery {
    buildings:[Building]
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
            console.log('hell O ')
            return await BuildingM.find();
        },
    },
    RootMutation: {
        async insertBuilding(_, {building}) {
            console.log(building)
            try {
                const insertedHome = await BuildingM.create(building);
                console.log(insertedHome)
                return insertedHome;
            }
            catch (a) {
                throw new Error("something went wrong " + a)
            }
        }
    }
};
export default makeExecutableSchema({
    typeDefs: [SchemaDefinition, RootQuery, RootMutation, Building],
    resolvers: resolvers,
});