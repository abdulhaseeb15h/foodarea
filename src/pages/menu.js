import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { useHistory } from "react-router-dom";
import { auth, where, signOut, collection, addDoc, db, getDoc, query, onSnapshot, onAuthStateChanged, doc, updateDoc } from '../configs/firebase';
import "../css/HomeStyle.css";
import Nav from '../components/navbar';

function Card() {
    let history = useHistory();
    const { state, dispatch } = useContext(GlobalContext);
    const [DishesArr, setDishesArr] = useState([]);


    // session maintained------------------------

    useEffect(() => {
        let CurrRest= state.CurrRest || localStorage.getItem('CurrRestId')
        console.log("Current Resturant ",CurrRest);
        const q = query(collection(db, "Dishes"), where("RestaurantId", "==", CurrRest));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const DishesClone = [];
            querySnapshot.forEach((doc) => {
                DishesClone.push(doc.data());
                // console.log(RestaurantsClone)
            });
            setDishesArr(DishesClone)
            // console.log("restss: ", RestArr,RestaurantsClone);

        });

    }, [])




    let CartArr=[]

    function AddToCart(SelectedDish){
        
    let CurrDishId = SelectedDish.target.parentNode.id; 
    // console.log(CurrDishId,"menuuu");
    
     
        const q = query(collection(db, "Dishes"), where("DishId", "==",CurrDishId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                
                // let CartArr= CartArr1.slice(0);
                CartArr.push(doc.data())
                dispatch({ type: "Selected_Dish", payload:doc.data() });   
            });
            // console.log("Cartt",CartArr);
            

            
            console.log("State Cartt",state.CartArr);
 

        });

    




    }

    return (





        <div className="CardDiv" >


            {


                DishesArr.map((keys, index) => {
                     // console.log("keyss "+keys.DishId, "<----->", index);


                    return (
                        <div key={keys + index} className="Cardcontainer">
                            <div className="layer-one">

                                <label >
                                    <i className="fas fa-bookmark"></i></label>
                            </div>
                            <div className="layer-two">
                                <div id={keys.DishId} className="text">
                                    <h4>{keys.DishName}</h4>
                                    <div className="detail">
                                        <p><i className="far fa-clock"></i>10min</p>
                                        <p><i className="fas fa-star"></i>4.7</p>
                                        <p><i className="fas fa-fire"></i>{keys.DishCate}</p>
                                    </div>
                                    <h4 id="price">{keys.DishPrice}</h4>
                                    <button onClick={AddToCart} >Add To Cart</button>
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
