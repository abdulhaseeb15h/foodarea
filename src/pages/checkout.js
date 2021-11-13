import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { useHistory } from "react-router-dom";
import { auth, where, getDocs, signOut, collection, addDoc, db, getDoc, query, onSnapshot, onAuthStateChanged, doc, updateDoc } from '../configs/firebase';
import "../css/checkout.css";
import Home from './home';
import Nav from '../components/navbar';


function Checkout() {

    let history = useHistory()
    const [CustNameF, setCustNameF] = useState();
    const [CustNameL, setCustNameL] = useState();
    const [CustAdd, setCustAdd] = useState();
    const [CustCont, setCustCont] = useState();
    const { state, dispatch } = useContext(GlobalContext);

    console.log("state rett", state.CartArr)

    async function PlaceOrder() {
        let orderAmount = 0;
        let itemIds = [];
        let resturantID = localStorage.getItem('CurrRestId');
        state.CartArr.map((keys, index) => {
            orderAmount += parseInt(keys.DishPrice)
            itemIds.push(keys.DishId)
            console.log(keys.DishName, "<--keys- Index -->", index)

        })
        const docRef = await addDoc(collection(db, "Orders"), {
            orderID: "",
            CustomerName: CustNameF + CustNameL,
            CustomerAddress: CustAdd,
            CustomerContact: CustCont,
            TotalAmount: orderAmount,
            OrderedDishes: itemIds,
            resturanId: resturantID,
            
        });
        
        const UpdateOrderID = doc(db, "Orders", docRef.id);
        await updateDoc(UpdateOrderID, {
            orderID: docRef.id
        });
        alert('Thank you for your order');
        history.push('/home')
        


    }
    return (
        <div>
    <div className="navbar" ><Nav /></div>


            <div className="container">
                <main>

                    <div className="section">
                        <h2>Order Info</h2>
                        <div className="billing-info formDiv">

                            <input value={CustNameF} onChange={(ev) => { setCustNameF(ev.target.value) }} placeholder="First Name" id="firstname" type="text" />
                            <br />
                            <input value={CustNameL} onChange={(ev) => { setCustNameL(ev.target.value) }} placeholder=" Last Name  " id="lastname" type="text" />
                            <br />
                            <input value={CustAdd} onChange={(ev) => { setCustAdd(ev.target.value) }} placeholder="Complete Address" id="billaddress" type="text" />
                            <br />
                            <input placeholder="Nearby Location" id="billcity" type="text" />
                            <br />
                            <input value={CustCont} onChange={(ev) => { setCustCont(ev.target.value) }} placeholder="Contact No" id="billcountry " type="text" />
                        </div>
                    </div>
                    <button className="CheckOutbutton" onClick={PlaceOrder} >  Confirm Order</button>
                </main>
            </div>
        </div>
    )
}




export default Checkout;
