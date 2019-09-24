import num2Word from 'number-to-words';

export default (time: string, timeZone: string) => {
    const lastFeeding = new Date(time).toLocaleString('en-US', { timeZone }).split(', ');
    const feedingDates = lastFeeding[0].split('/');
    const feedingTimes = lastFeeding[1].split(':');
    const now = new Date().toLocaleString('en-US', { timeZone }).split(', ');
    const nowDates = now[0].split('/');
    let date = '';
    if (
        feedingDates[0] === nowDates[0]
        && feedingDates[1] === nowDates[1]
        && feedingDates[2] === nowDates[2]
    ) {
        date += fullDateTime(' today', feedingTimes);
    } else if (feedingDates[0] === nowDates[0] && feedingDates[2] === nowDates[2]) {
        if (Number(nowDates[1]) - Number(feedingDates[1]) === 1) {
            date += fullDateTime(' yesterday', feedingTimes);
        } else if (Number(nowDates[1]) - Number(feedingDates[1]) === 1) {
            date += fullDateTime(' two days ago', feedingTimes);
        }
    }
    if (!date) date += fullDateTime(feedingDates, feedingTimes);
    return date;
};

const fullDateTime = (dates, times) => {
    let str = '';
    if (typeof dates === 'string') str += dates;
    else str += ` ${justDate2Words(dates)}`;
    str += ` at ${justTime2Words(times)}`;
    return str;
};

const justDate2Words = (dates) => {
    let str = '';
    str += ` ${getMonth[dates[0]]}`;
    str += ` ${num2Word.toWordsOrdinal(dates[1])}`;
    str += ` ${num2Word.toWords(dates[3])}`;
    return str;
};

const justTime2Words = (times) => {
    let str = '';
    str += ` ${num2Word.toWords(times[0])}`;
    str += ` ${num2Word.toWords(times[1])} `;
    str += times[2].split(' ')[1].toLowerCase();
    return str;
};

const getMonth = {
    ['1']: 'january',
    ['2']: 'february',
    ['3']: 'march',
    ['4']: 'april',
    ['5']: 'may',
    ['6']: 'june',
    ['7']: 'july',
    ['8']: 'august',
    ['9']: 'september',
    ['10']: 'october',
    ['11']: 'november',
    ['12']: 'december'
};
