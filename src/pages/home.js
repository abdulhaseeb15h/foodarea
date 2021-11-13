import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { useHistory } from "react-router-dom";
import { auth, signOut, collection, addDoc, db, getDoc, query, onSnapshot, onAuthStateChanged, doc, updateDoc } from '../configs/firebase';
import "../css/HomeStyle.css"

import Nav from '../components/navbar';
import userimage from "../images/download.jpg"
import Slider from '../components/slider';
import Card from '../components/card';
import Footer from '../components/footer';



function Home() {
    
    let history = useHistory();
    history.push('/')

    const { state, dispatch } = useContext(GlobalContext);
    
    // const [RestArr, setRestArr] = useState([]);


    // // session maintained------------------------
    
    // useEffect(async () => {
    //     const q = query(collection(db, "Restaurants"));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const RestaurantsClone = [];
    //         querySnapshot.forEach((doc) => {
    //             RestaurantsClone.push(doc.data());
    //             console.log(doc.data())
    //             setRestArr([RestaurantsClone])
    //         });
    //         console.log(": ", RestaurantsClone,RestArr);

    //     });

    // }, [])

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // console.log("User Valid")
        } else {
            history.push("/signup");
        }
    })
    // session maintained------------------------


    //-----------------------------------------------------
    
    //----------------------Fetching Rests-------------------------------




    console.log(state.authUser, "auth return");
    //----------------------------------------------------
    return (
        <div className="home" >
    <div className="navbar" ><Nav /></div>
            <Slider />
            <h3 className="SliderHead" >All Restaurants</h3><hr />
            <br />
            <div className="CardDiv" >
                <Card />
               
            <Footer/>
            </div>
        </div>
    )
}

export default Home;
