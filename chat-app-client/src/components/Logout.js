import React from 'react';
import {useNavigate} from "react-router-dom";


function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.removeItem("chat-app-user");
        navigate("/login");
    }

    return (
        <button onClick={handleClick} className="ml-5 bg-red-500 text-white flex items-center justify-center px-2 py-1 rounded-sm">
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
      </button>
    )
}

export default Logout;