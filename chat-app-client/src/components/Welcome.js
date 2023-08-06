import React from "react";

function Welcome({currentUser}){
    return (
        <div className="welcome-container flex flex-col h-full items-center justify-center text-3xl text-gray-700">
        <h1>
          Welcome, <span className="text-blue-600">{currentUser.username}</span>
        </h1>
        <h3>Please select a chat to get started</h3>
      </div>
    )
}

export default Welcome;