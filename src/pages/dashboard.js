import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/context';
import { useHistory } from "react-router-dom";
import { auth, where, getDocs, signOut, collection, addDoc, db, getDoc, query, onSnapshot, onAuthStateChanged, doc, updateDoc } from '../configs/firebase';
import "../css/HomeStyle.css";


function Dashboard() {
    let history = useHistory()
    const [DishName, setDishName] = useState();
    const [DishDesc, setDishDesc] = useState();
    const [DishPrice, setDishPrice] = useState();
    const [DishCate, setDishCate] = useState();
    const [CurrUserID, setCurrUserID] = useState();
    // const [Dish,setDish]=useState();


    async function AddDish() {

     
        const docRef = await addDoc(collection(db, "Dishes"), {
            DishName: DishName,
            DishDesc:DishDesc,
            DishPrice:DishPrice,
            DishCate:DishCate,
            RestaurantId:CurrUserID,
            DishId: null,
          });
          console.log("Document written with ID: ", docRef.id);
          const UpdateDishId = doc(db, "Dishes", docRef.id);
          await updateDoc(UpdateDishId, {
            DishId: docRef.id
          });

        
    }





    return (
        <div>
            <div style={{ marginTop: "10%" }} className="container">

                <h2>Add Dishes</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label ></label>
                            <input type="text" className="form-control" value={DishName} onChange={(ev) => { setDishName(ev.target.value) }} placeholder="Dish Name" id="first" />
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="form-group">
                            <label ></label>
                            <textarea className="form-control" value={DishDesc} onChange={(ev) => { setDishDesc(ev.target.value) }} placeholder="Dish Description" id="last" ></textarea>

                        </div>
                    </div>

                </div>


                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label ></label>
                            <input type="text" className="form-control" value={DishPrice} onChange={(ev) => { setDishPrice(ev.target.value) }} placeholder="Price" id="company" />
                        </div>


                    </div>


                    <div className="col-md-6">

                        <div className="form-group">

                            <input type="file" className="form-control" id="customFile" />
                        </div>
                    </div>

                </div>



                <div className="row">
                    <div className="col-md-6">

                        <div className="form-group">
                            <label > </label>
                            <input type="text" className="form-control" value={DishCate} onChange={(ev) => { setDishCate(ev.target.value) }} id="email" placeholder=" Category" />
                        </div>
                    </div>



                </div>






                <button onClick={AddDish} className="btn btn-secondary btn-lg btn-block">Save Item</button>

            </div>
        </div>
    )
}
export default Dashboard;