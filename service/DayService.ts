import { DayM } from '../schema/Day';

export const updateDay = async (dayId: string, note: string) => {
  return await DayM.findById(dayId, async (err, day) => {
    if (err) throw err;
    day.note = note;
    await day.save((err, newDay) => {
      if (err) throw err;
      return newDay;
    });
  });
};
