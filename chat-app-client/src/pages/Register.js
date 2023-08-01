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

    async function handleSubmit(evt){
        evt.preventDefault();
        if(handleValidation()){
            const {username, email, password} = values;
            const {data} = await axios.post(registerRoute, {username, email, password});
            if(data.status === true){
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate('/');
            }
        }
    }

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
        <div className="bg-blue-50 h-screen flex items-center">
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
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer/>
        </div>
    )

}

export default Register;