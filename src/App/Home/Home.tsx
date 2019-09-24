import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from '@material-ui/core';

const Home: React.FC = () => {
    const [time, setTime] = useState('');

    const callBackend = async () => {
        const res = await axios({
            method: 'GET',
            url: '/api/test'
        });
        setTime(res.data.time);
    };
    return (
        <div>
            <Card elevation={0}>
                <Button onClick={callBackend}>Home</Button>
            </Card>
            <Card>{time}</Card>
        </div>
    );
};
export default Home;
