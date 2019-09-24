export default {
    "interactionModel": {
        "languageModel": {
            "invocationName": "food tracker",
            "intents": [
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "reportFeedingIntent",
                    "slots": [
                        {
                            "name": "pet",
                            "type": "pet"
                        }
                    ],
                    "samples": [
                        "that {pet} has food",
                        "that {pet} has been fed",
                        "that i fed the {pet}",
                        "that i fed {pet}"
                    ]
                },
                {
                    "name": "getLastFeedingIntent",
                    "slots": [
                        {
                            "name": "pet",
                            "type": "pet"
                        }
                    ],
                    "samples": [
                        "was {pet} fed today",
                        "when was the last time {pet} was fed",
                        "if {pet} was fed today"
                    ]
                },
                {
                    "name": "LaunchRequest"
                }
            ],
            "types": [
                {
                    "name": "pet",
                    "values": [
                        {
                            "name": {
                                "value": "minnie",
                                "synonyms": [
                                    "the cat",
                                    "cat"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "charlie",
                                "synonyms": [
                                    "dog",
                                    "the dog",
                                    "cha",
                                    "char"
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
};const model = {
    "interactionModel": {
        "languageModel": {
            "invocationName": "food tracker",
            "intents": [
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "reportFeedingIntent",
                    "slots": [
                        {
                            "name": "pet",
                            "type": "pet"
                        }
                    ],
                    "samples": [
                        "that {pet} has food",
                        "that {pet} has been fed",
                        "that i fed the {pet}",
                        "that i fed {pet}"
                    ]
                },
                {
                    "name": "getLastFeedingIntent",
                    "slots": [
                        {
                            "name": "pet",
                            "type": "pet"
                        }
                    ],
                    "samples": [
                        "was {pet} fed today",
                        "when was the last time {pet} was fed",
                        "if {pet} was fed today"
                    ]
                },
                {
                    "name": "LaunchRequest"
                }
            ],
            "types": [
                {
                    "name": "pet",
                    "values": [
                        {
                            "name": {
                                "value": "minnie",
                                "synonyms": [
                                    "the cat",
                                    "cat"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "charlie",
                                "synonyms": [
                                    "dog",
                                    "the dog",
                                    "cha",
                                    "char"
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
};
