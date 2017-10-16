/**
 * Created by Farmas on 04.09.2017.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import schema from './schema/schema';
import { graphiqlConnect } from 'apollo-server-express';
import cors = require('cors');
import REST from './rest-api/index';
import { HourM } from "./schema/Hour";
import { DayM } from "./schema/Day";
const app = express();
let ObjectId = require('mongoose').Types.ObjectId;

const PORT = process.env.PORT || 6004;
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

app.use(
  '/graphiql',
  graphiqlConnect({
    endpointURL: '/graphql',
  }),
);
app.get('/api/hello2', async (req, res) => {
    res.json({ hello: 'world - 2' });
});
app.use('/api',REST )
// app.get('/api/hours/:dayId', async (req, res) => {
//     const hours = await HourM.find({ dayId: new ObjectId(req.params.dayId) });
//     res.json(hours);
// });
// app.get('/api/day/building/:buildingId', async (req, res) => {
//     console.log('dafaaaq')
//
//     const day = await DayM.findOne({
//         buildingId: req.params.buildingId,
//         date: new Date(req.query.date),
//     });
//     res.json(day);
// });


app.listen(PORT, () => {
  console.log(`Start is up and running on localhost:${PORT}`);
});
