import React, { useState, useContext, useEffect } from 'react';
import "../css/navbar.css";



import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
    
} from "react-router-dom";
import Nav from '../components/navbar';
import Signup from "../pages/signup";

import Home from "../pages/home";
import { auth, onAuthStateChanged, db, doc, getDoc } from '../configs/firebase';
import { GlobalContext } from '../context/context';

import RestaurantSignup from '../pages/restaurantSignup';
import Dashboard from '../pages/dashboard';
import Menu from '../pages/menu';
import Cart from '../pages/cart';
import Checkout from '../pages/checkout';

export default function App() {

    let history=useHistory()
    const { state, dispatch } = useContext(GlobalContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // fetchUserInfo(user.uid);
                // console.log(user);
            }
            else {
                console.log('user not found');
            }
        })
    }, []);

    const fetchUserInfo = async (uid) => {
        let userRef = doc(db, 'users', uid);
        console.log(uid);
        let userInfo = await getDoc(userRef);
        userInfo = userInfo.data();
        console.log(userInfo);
        dispatch({ type: "AUTH_USER", payload: userInfo });
    }



    return (
        <Router>
            
            
            <div>
                <Switch>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                  
                    <Route path="/cart">
                        <Cart />
                    </Route>

                    <Route path="/checkout">
                        <Checkout />
                    </Route>

                    <Route path="/dashboard">
                    
                        {(localStorage.getItem("isRest")==1)? <Dashboard />   :<Home/>  }
                       
                    </Route>

                    <Route path="/menu">
                        <Menu />
                    </Route>

                    <Route exact path="/home">
                        <Home />
                    </Route>

                    <Route exact path="/RestaurantSignup">
                        <RestaurantSignup />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>



                </Switch>
            </div>
        </Router>
    );
}