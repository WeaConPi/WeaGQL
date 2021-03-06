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
const app = express();
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

app.listen(PORT, () => {
  console.log(`Start is up and running on localhost:${PORT}`);
});
