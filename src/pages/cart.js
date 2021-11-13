import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { useHistory } from "react-router-dom";
import { auth, where, getDocs, signOut, collection, addDoc, db, getDoc, query, onSnapshot, onAuthStateChanged, doc, updateDoc } from '../configs/firebase';
import Nav from '../components/navbar';

import "../css/cart.css";
import Checkout from './checkout';


function Cart() {
    const { state, dispatch } = useContext(GlobalContext);
    let history=useHistory()
    function CheckOut() {
        console.log(state.CartArr)
        history.push("/checkout")
        
        
        
    }
    
    return (
        <div id="cart" style={{ maxWidth: "960px" }}>
    <div className="navbar" ><Nav /></div>


        {/* <CheckOut/> */}


            <div className="back"><span onClick={()=>{history.push("/menu")}} >&#11178; shop</span></div>
            <h1>Your Cart</h1>
            <div className="container-fluid">
                <div className="row align-items-start">
                    <div className="col-12 col-sm-8 items">

                        {
                            state.CartArr.map((keys, index) => {
                                console.log(keys.DishName, "<--keys- Index -->", index)
                                return (
                                    
                                         <div key={keys+index} className="cartItem row align-items-start">
                                            <div className="col-3 mb-2">
                                                <img className="w-100" src="https://badux.co/smc/codepen/birdcage-posters.jpg" alt="art image" />
                                            </div>
                                            <div className="col-5 mb-2">
                                                <h6 className="">Item {index}</h6>
                                                <p className="pl-1 mb-0"></p>
                                                <p className="pl-1 mb-0">{keys.DishName}</p>
                                            </div>
                                            <div className="col-2">
                                                <p className="cartItemQuantity p-1 text-center">1</p>
                                            </div>
                                            <div className="col-2">
                                                <p id="cartItem1Price">Rs:{keys.DishPrice}/-</p>
                                            </div>
                                        </div>
                                    
                                )
                            })
                        }



                    </div>
                    <div className="col-12 col-sm-4 p-3 proceed form">
                        <div className="row m-0">
                            <div className="col-sm-8 p-0">
                                <h6>Subtotal</h6>
                            </div>
                            <div className="col-sm-4 p-0">
                                <p id="subtotal">$132.00</p>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col-sm-8 p-0 ">
                                <h6>Tax</h6>
                            </div>
                            <div className="col-sm-4 p-0">
                                <p id="tax">$6.40</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row mx-0 mb-2">
                            <div className="col-sm-8 p-0 d-inline">
                                <h5>Total</h5>
                            </div>
                            <div className="col-sm-4 p-0">
                                <p id="total">$138.40</p>
                            </div>
                        </div>
                        <button onClick={CheckOut} id="btn-checkout" className="shopnow"><span>Checkout</span></button> 
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Cart;