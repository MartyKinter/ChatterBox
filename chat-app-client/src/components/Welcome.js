import React from "react";

function Welcome({currentUser}){
    return (
        <div className="welcome-container flex flex-col items-center">
        <h1>
          Welcome, <span>{currentUser.username}</span>
        </h1>
        <h3>Please select a chat to get started</h3>
      </div>
    )
}

export default Welcome;