import React from 'react';

import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import Room from './Test/Room';
import Create from './Test/Create';

const HomePage = () => {

    return (
        <Router>
            <Switch>
                {
                //<Route path='/' component=''/>
                }
                <Route exact path="/"><p>hey!</p></Route>
                <Route path="/join" component={Room}/>
                <Route path="/join1" component={Create}/>
            </Switch>
        </Router>
    )
}

export default HomePage
