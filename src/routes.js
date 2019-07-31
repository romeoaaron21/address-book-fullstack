import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Login from './components/LoginPage'
import Register from './components/RegisterPage'
import AddressBook from './components/AddressBookPage'
// import { ProtectedRoute } from './components/PrivateRoute'


// const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
//     return (
//       <Route
//         path={path}
//         {...rest}
//         render={props => {
//           return loggedIn ? (
//             <Comp {...props} />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: {
//                   prevLocation: path,
//                 },
//               }}
//             />
//           );
//         }}
//       />
//     );
//   };


export default function Routes(){
    return(
            <Switch>
                <Route exact path="/" component={ Login } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/addressBook" component={ AddressBook } />

                {/* <ProtectedRoute exact path="/addressBook" component={ AddressBook }  /> */}
            </Switch>
    )
}