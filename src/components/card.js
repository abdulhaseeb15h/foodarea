import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { useHistory } from "react-router-dom";
import { auth, signOut, collection, addDoc, db, getDoc, query, onSnapshot, onAuthStateChanged, doc, updateDoc } from '../configs/firebase';
import "../css/HomeStyle.css";



function Card() {
    let history = useHistory();
    const { state, dispatch } = useContext(GlobalContext);
    const [RestArr, setRestArr] = useState([]);
    
    
    // session maintained------------------------

    useEffect(  () => {
        const q = query(collection(db, "Restaurants"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const RestaurantsClone = [];
            querySnapshot.forEach((doc) => {
                RestaurantsClone.push(doc.data());
                // console.log(RestaurantsClone)
            });
            setRestArr(RestaurantsClone)
            // console.log("restss: ", RestArr,RestaurantsClone);
            
        });

    }, [])



function GotoMenu (thisRest){
    let CurrRestId = thisRest.target.parentNode.id;
    localStorage.setItem('CurrRestId',CurrRestId);
    dispatch({ type: "Selected_Rest", payload: CurrRestId });
    // console.log(state.CurrRest,"satt ret");
    
    history.push("/menu")

}


    return (





        <div className="CardDiv" >


            {


                RestArr.map((keys, index) => {
                    // console.log("keyss "+keys.UserName, "<----->", index);
                   
            
                    return(
            <div   key={keys+index} className="Cardcontainer">
                <div className="layer-one">
                  
                    <label >
                        <i className="fas fa-bookmark"></i></label>
                </div>
                <div className="layer-two">
                    <div id={keys.uid } className="text">
                        <h4>{keys.UserName}</h4>
                        <div className="detail">
                            <p><i className="far fa-clock"></i>10min</p>
                            <p><i className="fas fa-star"></i>4.7</p>
                            <p><i className="fas fa-fire"></i>300 kcal</p>
                        </div>
                        <h4 id="price">$ 10</h4>
                        <button onClick={GotoMenu} >Visit</button>
                    </div>
                </div>
            </div>
                    )
})


}

        </div>
    )
}

export default Card;
