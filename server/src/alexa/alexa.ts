import express from 'express';
import { SkillBuilders, DefaultApiClient } from 'ask-sdk-core';
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import { alexaModel as model, feedingModel } from './../models';
import { generalUtils as utils, dateParser } from './../utils';

const APP_ID = 'amzn1.ask.skill.4b610d48-9479-47ca-b456-a266c4fdbee2';
const invocationName = "food tracker";

const launchRequestHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'LaunchRequest'),
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        const say = `hello and welcome to ${invocationName}! Say help to hear some options.`;
        const skillTitle = utils.capitalize(invocationName);
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withStandardCard('Welcome!',
                'Hello!\nThis is a card for your skill, ' + skillTitle,
                welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
            .getResponse();
    }
};

const reportFeedingHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'reportFeedingIntent'),
    handle: async (handlerInput) => {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let say = '';
        let slotStatus = '';
        let success = false;
        let slotValues = getSlotValues(request.intent.slots);
        if (slotValues.pet.heardAs) slotStatus += 'your pet name was heard as ' + slotValues.pet.heardAs + '. ';
        else slotStatus += 'I didn\'t hear your pet name. ';
        if (slotValues.pet.ERstatus === 'ER_SUCCESS_MATCH') {
            try {
                await feedingModel.addFeeding(slotValues.pet.heardAs.toLowerCase());
                say += `okay, ${slotValues.pet.heardAs}'s feeding has been recorded. thank you!`;
                success = true;
            } catch (e) {
                say += 'oops, there\'s been a problem, tell uncle craig please. '
            }
        }
        if (slotValues.pet.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any pet names. ';
            console.log('***** consider adding "' + slotValues.pet.heardAs + '" to the custom slot type used by slot pet! ');
        }
        if ((slotValues.pet.ERstatus === 'ER_SUCCESS_NO_MATCH') || (!slotValues.pet.heardAs)) {
            slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('reportFeedingIntent', 'pet'), 'or');
        }
        if (!success) say += slotStatus;
        return responseBuilder
            .speak(say)
            .reprompt(`try again, ${say}`)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const getLastFeedingHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'getLastFeedingIntent'),
    handle: async (handlerInput) => {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const serviceClientFactory = handlerInput.serviceClientFactory;
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;

        let say = '';
        let slotStatus = '';
        let success = false;
        let slotValues = getSlotValues(request.intent.slots);
        let userTimeZone;

        try {
            const upsServiceClient = serviceClientFactory.getUpsServiceClient();
            userTimeZone = await upsServiceClient.getSystemTimeZone(deviceId);    
        } catch (error) {
            if (error.name !== 'ServiceError') {
                return handlerInput.responseBuilder.speak('There was a problem connecting to the service.').getResponse();
            }
            console.log('error', error.message);
        }

        if (slotValues.pet.heardAs) slotStatus += 'your pet name was heard as ' + slotValues.pet.heardAs + '. ';
        else slotStatus += 'i didn\'t hear your pet name. ';
        if (slotValues.pet.ERstatus === 'ER_SUCCESS_MATCH') {
            try {
                const time = await feedingModel.getLatestFeeding(slotValues.pet.heardAs.toLowerCase());
                say += `${slotValues.pet.heardAs} was last fed ${dateParser(time, userTimeZone)}`;
                success = true;
            } catch (e) {
                say += 'oops, there\'s been a problem, tell uncle craig please. ';
            }
        }
        if (slotValues.pet.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.pet.heardAs + '" to the custom slot type used by slot pet! ');
        }
        if ((slotValues.pet.ERstatus === 'ER_SUCCESS_NO_MATCH') || (!slotValues.pet.heardAs)) {
            slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('getLastFeedingIntent', 'pet'), 'or');
        }
        if (!success) say += slotStatus;
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const fallbackIntentHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent'),
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let previousSpeech = getPreviousSpeechOutput(sessionAttributes);

        return responseBuilder
            .speak('Sorry I didnt catch what you said, ' + utils.stripSpeak(previousSpeech.outputSpeech))
            .reprompt(utils.stripSpeak(previousSpeech.reprompt))
            .getResponse();
    },
};

const cancelIntentHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'),
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        let say = 'Okay, talk to you later! ';
        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const helpIntentHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'),
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        let intents = getCustomIntents();
        let sampleIntent = utils.randomElement(intents);
        let say = 'You asked for help. ';
        say += ' Here something you can ask me, ' + utils.getSampleUtterance(sampleIntent);
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const stopIntentHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'),
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        let say = 'Okay, talk to you later! ';
        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const navigateHomeIntentHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NavigateHomeIntent'),
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        let say = 'Hello from AMAZON.NavigateHomeIntent. ';
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const sessionEndedHandler = {
    canHandle: (handlerInput) => (handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'),
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const errorHandler = {
    canHandle: () => true,
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('Sorry, an error occurred.  Please say again.')
            .reprompt('Sorry, an error occurred.  Please say again.')
            .getResponse();
    }
};

interface slots {
    pet: {
        heardAs: string,
        resolved: string,
        ERstatus: string
    }
}

function getSlotValues(filledSlots: object): slots {
    const slotValues: slots = { pet: { heardAs: '', resolved: '', ERstatus: '' } };
    Object.keys(filledSlots).forEach((item) => {
        const name = filledSlots[item].name;
        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        ERstatus: 'ER_SUCCESS_MATCH'
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: '',
                        ERstatus: 'ER_SUCCESS_NO_MATCH'
                    };
                    break;
                default:
                    break;
            }
        } else {
            slotValues[name] = {
                heardAs: filledSlots[item].value,
                resolved: '',
                ERstatus: ''
            };
        }
    }, this);
    return slotValues;
}

function getExampleSlotValues(intentName: string, slotName: string) {
    let examples = [];
    let slotType = '';
    let slotValuesFull = [];
    let intents = model.interactionModel.languageModel.intents;
    for (let i = 0; i < intents.length; i++) {
        if (intents[i].name == intentName) {
            let slots = intents[i].slots;
            for (let j = 0; j < slots.length; j++) {
                if (slots[j].name === slotName) {
                    slotType = slots[j].type;
                }
            }
        }
    }
    let types = model.interactionModel.languageModel.types;
    for (let i = 0; i < types.length; i++) {
        if (types[i].name === slotType) {
            slotValuesFull = types[i].values;
        }
    }
    examples.push(slotValuesFull[0].name.value);
    examples.push(slotValuesFull[1].name.value);
    if (slotValuesFull.length > 2) {
        examples.push(slotValuesFull[2].name.value);
    }
    return examples;
}

function sayArray(myData, penultimateWord = 'and') {
    let result = '';
    myData.forEach(function (element, index) {
        if (index === 0) {
            result = element;
        } else if (index === myData.length - 1) {
            result += ` ${penultimateWord} ${element}`;
        } else {
            result += `, ${element}`;
        }
    });
    return result;
}

const welcomeCardImg = {
    smallImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane720_480.png",
    largeImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png"
};

function getCustomIntents() {
    const modelIntents = model.interactionModel.languageModel.intents;
    let customIntents = [];
    for (let i = 0; i < modelIntents.length; i++) {
        if (modelIntents[i].name.substring(0, 7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest") {
            customIntents.push(modelIntents[i]);
        }
    }
    return customIntents;
}

function getPreviousSpeechOutput(attrs) {
    if (attrs.lastSpeechOutput && attrs.history.length > 1) return attrs.lastSpeechOutput;
    return false;
}

const skill = SkillBuilders
    .custom()
    .addRequestHandlers(
        fallbackIntentHandler,
        cancelIntentHandler,
        helpIntentHandler,
        stopIntentHandler,
        navigateHomeIntentHandler,
        reportFeedingHandler,
        getLastFeedingHandler,
        launchRequestHandler,
        sessionEndedHandler
    )
    .withSkillId(APP_ID)
    .addErrorHandlers(errorHandler)
    .withApiClient(new DefaultApiClient())
    .create();

const adapter = new ExpressAdapter(skill, true, true);

const router = express.Router();

router.post('/', adapter.getRequestHandlers());

export default router;
