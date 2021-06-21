import React from 'react';

import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import Room from './components/Test/Room';
import Create from './components/Test/Create';
import Inicio from './pages/Inicio';
import Problema from './pages/Problema';

const HomePage = () => {

    return (
        <Router>
            <Switch>
                
                <Route exact path="/home" component={Inicio}/>
                <Route exact path="/join" component={Room}/>
                <Route exact path="/join1" component={Create}/>
                <Route exact path="/problema/:id" component={Problema}/>
                
            </Switch>
        </Router>
    )
}

export default HomePage
