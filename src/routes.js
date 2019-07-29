import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './components/LoginPage'
import Register from './components/RegisterPage'


export default function Routes(){
    return(
            <Switch>
                <Route exact path="/" component={ Login } />
                <Route exact path="/register" component={ Register } />
            </Switch>
        
    )
}