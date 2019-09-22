import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./App/Home/Home'));
const FourOhFour = lazy(() => import('./App/common/FourOhFour'));

export default () => (
    <Router>
        <Suspense fallback={<span>Loading...</span>}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={FourOhFour} />
            </Switch>
        </Suspense>
    </Router>
);
