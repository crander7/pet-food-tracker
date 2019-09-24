const capitalize = (myString: string): string => myString.replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase());
const randomElement = (myArray) => (myArray[Math.floor(Math.random() * myArray.length)]);
const stripSpeak = (str: string) => (str.replace('<speak>', '').replace('</speak>', ''));
const getSampleUtterance = (intent) => randomElement(intent.samples);

export default {
    capitalize,
    randomElement,
    stripSpeak,
    getSampleUtterance
};
