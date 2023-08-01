import React, {useEffect, useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../ApiRoutes";
import {ToastContainer, toast} from "react-toastify";

function Login(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const toastOptions = {position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light"};

    useEffect(()=> {
        if(localStorage.getItem("chat-app-user")){
            navigate('/');
        }
    }, [navigate])

    async function handleSubmit(evt){
        evt.preventDefault();
        if(handleValidation()){
            const {username, password} = values;
            const {data} = await axios.post(loginRoute, {username, password});
            if(data.status === true){
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate('/');
            }
        }
    }

    function handleValidation(){
        const {password, username} = values;
        if(password === ""){
            toast.error("Must enter username and password", toastOptions);
            return false;
        }else if(username.length === ""){
            toast.error("Must enter username and password", toastOptions);
            return false;
        }
        return true;
    }

    function handleChange(evt){
        setValues({...values, [evt.target.name]:evt.target.value});
    }

    return(
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={(evt) => handleSubmit(evt)}>

                <input 
                value={values.username} 
                onChange={evt => handleChange(evt)} 
                type="text" placeholder="Username" 
                name="username"
                min="3"
                className="block w-full rounded-sm p-2 mb-2 border"/>
    
                <input 
                value={values.password}
                onChange={evt => handleChange(evt)} 
                type="password" placeholder="Password" 
                name="password"
                className="block w-full rounded-sm p-2 mb-2 border"/>


                <button type="submit" className="bg-blue-500 text-white block w-full rounded-sm p-2">
                    Login
                </button>
                <span>Don't have an account? <Link to="/register">Create Account</Link></span>
            </form>
            <ToastContainer/>
        </div>
    )

}

export default Login;