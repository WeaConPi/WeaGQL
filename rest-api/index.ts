import { DayM } from '../schema/Day';
import { HourM } from '../schema/Hour';
let ObjectId = require('mongoose').Types.ObjectId;
import * as express from 'express';
import * as bodyParser from 'body-parser';

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/hello', async (req, res) => {
  res.json({ hello: 'world' });
});
router.get('/hours/:dayId', async (req, res) => {
  const hours = await HourM.find({ dayId: new ObjectId(req.params.dayId) });
  res.json(hours);
});
router.get('/day/building/:buildingId', async (req, res) => {
  const day = await DayM.findOne({
    buildingId: req.params.buildingId,
    date: new Date(req.query.date),
  });
  res.json(day);
});

export default router;
