import React from 'react';

import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import Room from './Test/Room';
import Create from './Test/Create';
import Inicio from './../pages/Inicio';
import Problema from './../pages/Problema';

const HomePage = () => {

    return (
        <Router>
            <Switch>
                {
                //<Route path='/' component=''/>
                }
                <Route exact path="/" component={Inicio}></Route>
                <Route exact path="/join" component={Room}/>
                <Route exact path="/join1" component={Create}/>
                <Route exact path="/problema/:id" component={Problema}/>
                
            </Switch>
        </Router>
    )
}

export default HomePage
