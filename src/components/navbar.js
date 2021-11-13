import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { auth, signOut, collection, addDoc, db, getDoc, query, onSnapshot, onAuthStateChanged, doc, updateDoc } from '../configs/firebase';
import "../css/HomeStyle.css";


import {
    Link,
    useHistory
} from "react-router-dom";


function Nav() {

    let history = useHistory();
    const LogOut = () => {
        // const auth = getAuth();
        signOut(auth).then(async () => {
            localStorage.setItem("isRest", 0)
            history.push("/signup")

        }).catch((error) => {
            // An error happened.
            console.log("logout error", error)
        });

    }
    return (
        <div>
            <h1 className='navHead'>Foodarea</h1>
            <nav>
                <ul>
                    <li className="nav-item" >
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signin">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup">Login</Link>
                    </li>
                    <li className="nav-item">
                        <span   onClick={LogOut} >Logout</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;
