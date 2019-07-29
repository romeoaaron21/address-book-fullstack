import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './components/LoginPage'
import Register from './components/RegisterPage'
import AddressBook from './components/AddressBookPage'


export default function Routes(){
    return(
            <Switch>
                <Route exact path="/" component={ Login } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/addressBook" component={ AddressBook } />
            </Switch>
        
    )
}