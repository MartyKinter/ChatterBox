import React from "react";
import {Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import { registerRoute } from "../ApiRoutes";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Register(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    //if already logged in send to home page
    useEffect(()=> {
        if(localStorage.getItem("chat-app-user")){
            navigate('/');
        }
    }, [navigate])

    const toastOptions = {position: "bottom-right",
                          autoClose: 5000,
                          pauseOnHover: true,
                          draggable: true,
                          theme: "light"};

    //send form data to register route and save returned token to local storage for 
    //validating if user is logged in and storing user data
    async function handleSubmit(evt){
        evt.preventDefault();
        if(handleValidation()){
            const {username, email, password} = values;
            const {data} = await axios.post(registerRoute, {username, email, password});
            if(data.status === true){
                localStorage.setItem("chat-app-user", JSON.stringify(data.token));
                navigate('/');
            }
        }
    }

    //validate form data
    function handleValidation(){
        const {password, confirmPassword, username, email} = values;
        if(password !== confirmPassword){
            toast.error("password and confirm password should match", toastOptions);
            return false;
        }else if(username.length <= 3){
            toast.error("Username should be more than 3 characters", toastOptions);
            return false;
        }else if(password.length < 8){
            toast.error("Password should be more than or equal to 8 characters", toastOptions);
            return false;
        }else if(email === ""){
            toast.error("Email is required", toastOptions);
            return false;
        }
        return true;
    }

    function handleChange(evt){
        setValues({...values, [evt.target.name]:evt.target.value});
    }

    return(
        <>
        <div className="bg-blue-50 h-screen flex flex-col items-center justify-center">
        <div className="flex gap-2 text-blue-600 font-bold mb-10 text-5xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                </svg>
            ChatterBox
            </div>

            <form className="w-64 mx-auto mb-12" onSubmit={(evt) => handleSubmit(evt)}>

                <input 
                value={values.username} 
                onChange={evt => handleChange(evt)} 
                type="text" placeholder="Username" 
                name="username"
                className="block w-full rounded-sm p-2 mb-2 border"/>

                <input 
                value={values.email} 
                onChange={evt => handleChange(evt)} 
                type="email" placeholder="Email" 
                name="email"
                className="block w-full rounded-sm p-2 mb-2 border"/>
                
                <input 
                value={values.password}
                onChange={evt => handleChange(evt)} 
                type="password" placeholder="Password" 
                name="password"
                className="block w-full rounded-sm p-2 mb-2 border"/>

                <input 
                value={values.confirmPassword}
                onChange={evt => handleChange(evt)} 
                type="password" placeholder="Confirm Password" 
                name="confirmPassword"
                className="block w-full rounded-sm p-2 mb-2 border"/>

                <button type="submit" className="bg-blue-500 text-white block w-full rounded-sm p-2">
                    Create User
                </button>
                <span>Already have an account? <Link to="/login" className="cursor-pointer text-blue-600">Login</Link></span>
            </form>
            <ToastContainer/>
        </div>
        </>
    )

}

export default Register;