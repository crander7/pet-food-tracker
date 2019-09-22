import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Routes from './../routes';
import './App.scss';

const App: React.FC = () => (
    <MuiThemeProvider theme={theme}>
        <Routes />
    </MuiThemeProvider>
);

export default App;
