import { createMuiTheme } from '@material-ui/core/styles';
import {
    primaryFont,
    inputColor,
    grayInputBackground,
    grayInputDisabled,
    primaryBlue,
    primaryBlueLowlight,
    primaryGreen,
    globalBackground,
    primaryRed,
    globalShadow,
    globalShadowDark,
    fontColor
} from './variables.scss';

const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;

const createShadow = (...px) => (
    [
        `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0, 0, 0, ${shadowKeyUmbraOpacity})`,
        `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0, 0, 0, ${shadowKeyPenumbraOpacity})`,
        `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0, 0, 0, ${shadowAmbientShadowOpacity})`
    ].join(',')
);

const placeholderVisible = {
    opacity: 1,
    color: '#FF5E5C'
};

const placeholder = {
    opacity: 1,
    color: '#919191'
};

const placeholderHidden = {
    opacity: 1,
    color: 'green'
};

const theme = createMuiTheme({
    palette: {
        primary: {
            light: primaryGreen,
            main: primaryGreen,
            dark: primaryGreen,
            contrastText: '#000'
        },
        secondary: {
            light: primaryBlue,
            main: primaryBlue,
            dark: primaryBlue,
            contrastText: '#000'
        },
        error: {
            light: '#FF5E5C',
            main: '#FF5E5C',
            dark: '#FF5E5C',
            contrastText: '#fff'
        },
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2
    },
    breakpoints: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920
    },
    shadows: [
        // '0px 1px 1px -3px rgba(0, 0, 0, 0.2), 0px 1px 11px 0px rgba(0, 0, 0, 0.0), 0px 1px 1px 2px rgba(0, 0, 0, 0.12)',
        globalShadow,
        '0 -1px 0 #e0e0e0, 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
        createShadow(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1),
        createShadow(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2),
        createShadow(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2),
        createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
        createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
        createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
        globalShadowDark,
        // createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
        createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
        createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
        createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
        createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
        createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
        createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
        createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
        createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
        createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
        createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
        createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
        createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
        createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
        createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
        createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
        // createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
        createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)
    ],
    overrides: {
        MuiAppBar: {
            root: {
                boxShadow: 'none'
            },
            colorPrimary: {
                backgroundColor: 'transparent'
            },
            colorSecondary: {
                backgroundColor: '#fff'
            }
        },
        MuiTab: {
            root: {
                ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
                    minWidth: 100
                },
                backgroundColor: globalBackground,
                fontWeight: 400
            },
            textColorInherit: {
                color: 'inherit',
                opacity: 0.7,
                background: 'transparent',
                '&$selected': {
                    opacity: 1,
                    color: primaryBlue
                },
                '&$disabled': {
                    opacity: 0.4
                },
                '&:hover': {
                    opacity: 1,
                    color: primaryBlue
                }
            },
            label: {
                ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
                    fontSize: 15
                }
            },
            labelContainer: {
                ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
                    padding: '6px 30px 0px 30px'
                }
            }
        },
        // MuiPrivateTabIndicator: {
        //     root: {
        //         borderRadius: 1
        //     }
        // },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: primaryBlue
            }
        },
        MuiPickersToolbarButton: {
            toolbarBtn: {
                color: '#fff'
            }
        },
        MuiPickersYear: {
            root: {
                '&:focus': {
                    color: primaryBlue
                }
            },
            $selected: {
                color: primaryBlue
            }
        },
        MuiSelect: {
            filled: {
                background: grayInputBackground,
                borderRadius: 6
            },
            selectMenu: {
                borderRadius: 6
            }
        },
        MuiSwitch: {
            icon: {
                width: 6,
                height: 6,
                color: '#fff',
                boxShadow: 'none'
            },
            bar: {
                backgroundColor: '#C6C6C6',
                width: '20px',
                height: '10px',
                opacity: '1',
                marginTop: '-5px',
                marginLeft: '-12px'
            },
            iconChecked: {
                boxShadow: 'none'
            },
            colorPrimary: {
                '&$checked': {
                    transform: 'translateX(10px)',
                    color: primaryGreen,
                    '& + $bar': {
                        backgroundColor: primaryGreen,
                        opacity: '1'
                    }
                },
                '&$disabled': {
                    '& $icon': {
                        boxShadow: 'none'
                    }
                }
            },
            switchBase: {
                height: '10px'
            },
            root: {
                minWidth: '0px',
                marginRight: 0
            }
        },
        MuiButton: {
            root: {
                fontWeight: 600
            },
            containedSecondary: {
                color: '#fff',
                boxShadow: 'none',
                borderRadius: 50,
                padding: '6px 30px',
                '&:hover': {
                    backgroundColor: primaryBlueLowlight
                }
            }
        },
        MuiFilledInput: {
            root: {
                backgroundColor: grayInputBackground,
                '&:hover': {
                    backgroundColor: grayInputBackground
                },
                '&$focused': {
                    backgroundColor: grayInputBackground
                },
                borderRadius: 6,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6
            },
            input: {
                padding: 'none',
                backgroundColor: grayInputBackground,
                borderRadius: 6,
                '&$disabled': {
                    backgroundColor: grayInputDisabled
                }
            },
            adornedEnd: {
                paddingRight: 0
            },
            underline: {
                '&:after': {
                    borderBottom: `2px solid ${primaryBlue}`,
                    borderRadius: 6,
                    left: 0,
                    bottom: 0,
                    // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    transform: 'scaleX(0)',
                    pointerEvents: 'none' // Transparent to the hover style.
                },
                '&$focused:after': {
                    transform: 'scaleX(1)',
                    borderRadius: 6
                },
                '&$error:after': {
                    borderBottomColor: primaryRed,
                    borderRadius: 6
                },
                '&:before': {
                    borderBottom: 'transparent',
                    left: 0,
                    borderRadius: 6,
                    bottom: 0,
                    // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
                    content: '"\\00a0"',
                    position: 'absolute',
                    right: 0,
                    pointerEvents: 'none' // Transparent to the hover style.
                },
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: 'transparent'
                },
                '&$disabled:before': {
                    borderBottom: 'none'
                }
            },
            multiline: {
                padding: 0,
                position: 'absolute',
                zIndex: 100,
                boxShadow: globalShadow
            }
        },
        MuiExpansionPanel: {
            root: {
                '&:before': {
                    position: 'absolute',
                    left: 0,
                    top: -1,
                    right: 0,
                    height: 1,
                    content: '',
                    opacity: 1
                }
            }
        },
        MuiChip: {
            icon: {
                marginLeft: 8,
                color: '#7c7c7c',
                marginRight: 0
            },
            label: {
                paddingLeft: 8,
                paddingRight: 8
            },
            root: {
                color: '#7c7c7c',
                margin: '5px 8px 5px 0'
            },
            colorPrimary: { // Chips in search and safetyCheck
                boxShadow: globalShadow,
                backgroundColor: '#fff',
                '& .inf-attributes-icon': {
                    color: primaryBlue
                }
            },
            iconColorPrimary: {
                color: primaryBlue
            },
            deleteIconColorPrimary: {
                color: fontColor
            },
            deletableColorPrimary: { // Chips in search and safetyCheck
                '&:focus': {
                    backgroundColor: '#c7c7c7'
                }
            },

            deleteIconColorSecondary: {
                color: '#7c7c7c',
                '&:hover': {
                    color: fontColor
                }
            },
            deletableColorSecondary: { // Chips in flyouts
                '&:focus': {
                    backgroundColor: '#c7c7c7'
                }
            },
            iconColorSecondary: {
                color: '#7c7c7c'
            },
            colorSecondary: { // Chips in flyouts
                backgroundColor: '#ebebeb'
            },
            deleteIcon: {
                fontSize: 18,
                marginRight: 8,
                marginLeft: 0
            }
        },
        MuiInput: {
            underline: {
                '&:after': {
                    borderBottom: `2px solid ${primaryBlue}`,
                    borderRadius: 6,
                    left: 0,
                    bottom: 0,
                    // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    transform: 'scaleX(0)',
                    pointerEvents: 'none' // Transparent to the hover style.
                },
                '&$focused:after': {
                    transform: 'scaleX(1)'
                },
                '&$error:after': {
                    borderBottomColor: primaryRed
                },
                '&:before': {
                    borderBottom: 'transparent',
                    borderRadius: 6,
                    left: 0,
                    bottom: 0,
                    // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
                    content: '"\\00a0"',
                    position: 'absolute',
                    right: 0,
                    pointerEvents: 'none' // Transparent to the hover style.
                },
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: 'transparent'
                },
                '&$disabled:before': {
                    borderBottom: 'transparent'
                }
            }
        },
        MuiInputBase: {
            root: {
                color: inputColor,
                // i propose the background should default to white, then if we want the gray fill, we just add variant="filled" to the input
                background: '#fff',
                borderRadius: 6,
                overflow: 'hidden'
            },
            input: {
                // i propose the background should default to white, then if we want the gray fill, we just add variant="filled" to the input
                background: '#fff',
                width: '100%',
                padding: 10,
                fontSize: 15,
                borderRadius: 6,
                '&::-webkit-input-placeholder': placeholder,
                '&::-moz-placeholder': placeholder, // Firefox 19+
                '&:-ms-input-placeholder': placeholder, // IE 11
                '&::-ms-input-placeholder': placeholder, // Edge
                '&:focus': {
                    outline: 0
                },
                'label[data-shrink=false] + $formControl &': {
                    '&::-webkit-input-placeholder': placeholderHidden,
                    '&::-moz-placeholder': placeholderHidden, // Firefox 19+
                    '&:-ms-input-placeholder': placeholderHidden, // IE 11
                    '&::-ms-input-placeholder': placeholderHidden, // Edge
                    '&:focus::-webkit-input-placeholder': placeholderVisible,
                    '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
                    '&:focus:-ms-input-placeholder': placeholderVisible, // IE 11
                    '&:focus::-ms-input-placeholder': placeholderVisible // Edge
                }
            }
        },
        MuiPickersCalendar: {
            transitionContainer: {
                boxSizing: 'border-box'
            }
        },
        MuiPickersDay: {
            day: {
                '&$selected': {
                    '&:hover': {
                        backgroundColor: primaryBlueLowlight
                    },
                    backgroundColor: primaryBlue
                },
                current: {
                    color: primaryBlue
                }
            }
        },
        MuiBadge: {
            badge: {
                color: '#fff',
                backgroundColor: primaryRed
            }
        },
        MuiDrawer: {
            paperAnchorDockedLeft: {
                borderRight: 'none'
            }
        },
        MuiFormControlLabel: {
            root: {
                marginRight: 0
            }
        },
        MuiTypography: {
            h6: {
                fontWeight: 700
            }
        }
    },
    typography: {
        fontFamily: primaryFont,
        color: fontColor,
        useNextVariants: true
    }
});

export default theme;
