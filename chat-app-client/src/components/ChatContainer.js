import React from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

function ChatContainer({currentChat}){

    const handleSendMsg = async (msg) => {

    };

    return (
        <>
        { currentChat && (
            <>
            <div className="header text-3xl flex items-center justify-center">
                {currentChat.username}<Logout/>
            </div>
            <Messages/>
            <ChatInput handleSendMsg={handleSendMsg}/>
            </>
        )}
        </>

      
    )
}

export default ChatContainer;