import { feedingModel } from './../models';
import { dateParser } from './../utils';

const test = async (req, res) => {
    const time = await feedingModel.getLatestFeeding('minnie');
    // time = new Date(time).toLocaleString('en-US', { timeZone: 'America/Denver' });
    // const now = new Date().toLocaleString('en-US', { timeZone: 'America/Denver' });
    // console.log(time, now);
    res.json({ time: dateParser(time, 'America/Denver') });
};

export default {
    test
};