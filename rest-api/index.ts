import { DayM } from '../schema/Day';
import { HourM } from '../schema/Hour';
let ObjectId = require('mongoose').Types.ObjectId;

export const initializeREST = app => {
  app.get('/api/hello', async (req, res) => {
    res.json({ hello: 'world' });
  });
  app.get('/api/hours/:dayId', async (req, res) => {
    const hours = await HourM.find({ dayId: new ObjectId(req.params.dayId) });
    res.json(hours);
  });
  app.get('/api/day/building/:buildingId', async (req, res) => {
    const day = await DayM.findOne({
      buildingId: req.params.buildingId,
      date: new Date(req.query.date),
    });
    res.json(day);
  });
};
