import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/context';
import { useHistory } from "react-router-dom";
import"../css/style.css";       
import { auth, createUserWithEmailAndPassword, db, setDoc, doc ,signInWithEmailAndPassword} from '../configs/firebase';
function Signup() {
    let history = useHistory();
    const { state, dispatch } = useContext(GlobalContext);
    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [Loginemail, setLoginEmail] = useState('');
    const [Loginpassword, setLoginPassword] = useState('');
    const [Username, setUsername] = useState('');
    const [Phone, setPhone] = useState('');
    const [City, setCity] = useState("Karachi");
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // const [role, setRole] = useState('');


    const register = async () => {
        try {
            console.log({ email }) 
            let { user } = await createUserWithEmailAndPassword(auth, email, password);
            let dataRef = doc(db, 'users', user.uid)
            await setDoc(dataRef, {
                email: user.email,
                uid: user.uid,
                UserName: Username,
                Phone: Phone,
                City: City,
                Role:"User"
            });


            alert("Your'e Registered Successfully")
            setEmail("");
            setPassword("");
            setUsername("")
            setPhone("")
            // history.push("signin")
            toggleForm();
        } catch (err) {
            setErrMsg(err.message);
            setTimeout(() => {
                setErrMsg('');
            }, 5000)
        }
    }


    function Login() {
        signInWithEmailAndPassword(auth, Loginemail, Loginpassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                // console.log(user, "UserFound")
              
                localStorage.setItem("isRest",0)

                history.push('/');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;

                const errorMessage = error.message;
                console.log("error msg", error);
                alert("User Not Found");
            });
    }

    function toggleForm() {
        //    alert("sss")
        var container = document.querySelector(".container");
        container.classList.toggle("active");
    }
    function dropdown() {
        var getul = document.querySelector(".DropUl")
        getul.classList.toggle('active');
    }
    return (

        <div>
            <section className="Ssection" >
                <div className={"container"}>
                    <div className={"user signinBx"}>
                        <div className={"imgBx"}><img src={"https://images.unsplash.com/photo-1576859958081-27de5c70262a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"} /></div>
                        <div className={"formBx"}>
                            <div>
                                <h2>Sign In</h2>
                                <input className={"forminput"} type="text"  value={Loginemail} onChange={(ev) => { setLoginEmail(ev.target.value) }} placeholder="Username" />
                                <input className={"forminput"} type="password"  value={Loginpassword} onChange={(ev) => { setLoginPassword(ev.target.value) }} placeholder="Password" />
                                <button onClick={Login} className={"btn fourth"}>Login</button>
                                <p className={"signup"}>
                                    Don't have an account ?
                                    <button className={"button-two"} onClick={toggleForm}><span><u>Create Account here...</u></span></button>
                                </p>
                                <br/>
                                <br/>
                            <button  onClick={()=>{history.push("/RestaurantSignup")}} className={"button-two"} > <span  style={{color: "black",fontStyle:"normal",fontSize:"20px" }}> Restaurant Login.?</span> </button>
                            </div>
                        </div>
                    </div>
                    <div className={"user signupBx"}>
                        <div className={"formBx"}>
                            <div>
                                <h2 className={"Formh2"} > Create an Account</h2>
                                <input className={"forminput"} type="text" value={Username} onChange={(ev) => { setUsername(ev.target.value) }} placeholder="Username" />
                                <input className={"forminput"} type="email" value={email} onChange={(ev) => { setEmail(ev.target.value) }} placeholder="Email Id" />
                                <input className={"forminput"} type="password" value={password} onChange={(ev) => { setPassword(ev.target.value) }} placeholder="Create Password" />
                                <input className={"forminput"} type="tel" value={Phone} onChange={(ev) => { setPhone(ev.target.value) }} placeholder="Phone Number" />
                                <div className={"forminput"}>
                                    <button className={"dropbutton"} onClick={dropdown} >City</button>
                                    <ul className={"DropUl"} >

                                        <li>Karachi</li>
                                        <li>Lahore</li>
                                        <li>Islamabad</li>
                                        <li>Rawalpindi</li>
                                    </ul>
                                </div>
                                <button onClick={register} className={"btn fourth"}>Sign up</button>



                                <p className={"signup"}>
                                    Already have an account ?
                                    <button className={"button-two"} onClick={toggleForm}><span><u>Login Now</u></span></button>
                            <button  onClick={()=>{history.push("/RestaurantSignup")}} className={"button-two"} > <span  style={{color: "black",fontStyle:"normal",fontSize:"20px" }}>Register Restaurant.?</span> </button>
                                </p>
                             
                             
                            </div>
                        </div>
                        <div className="imgBx"><img src={"https://images.unsplash.com/photo-1628972799193-1a6be77e183e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"} /></div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Signup;
