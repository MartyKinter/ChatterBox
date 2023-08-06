import React, {useState, useEffect, useRef} from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import {getAllMessagesRoute, sendMessageRoute} from "../ApiRoutes";
import {v4 as uuidv4} from "uuid";

function ChatContainer({currentChat, currentUser, socket}){
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef();

    //get all messages between the logged in user and the user for the chat thats selected
    useEffect(() => {
        const fetchMessages = async () => {
          // Only make the API call if currentUser is available
          if (currentUser && currentChat) {
            try {
              const resp = await axios.post(getAllMessagesRoute, {
                  from_user: currentUser.id,
                  to_user: currentChat.id
              });
              setMessages(resp.data);
            } catch (error) {
              console.error('Error fetching messages:', error);
            }
          }
        };
      
        fetchMessages();
      }, [currentChat, currentUser]);
      

    //send messaged data to the database to be saved for later loads
    //send socket message with the data to update messages real time
    const handleSendMsg = async (text) => {
        await axios.post(sendMessageRoute, {
            text, 
            from_user: currentUser.id, 
            to_user: currentChat.id,
            sender_id: currentUser.id
        });

        socket.current.emit("send-msg", {
            text: text,
            from_user: currentUser.id,
            to_user: currentChat.id,
        });

        const msgs = [...messages];
        msgs.push({fromSelf:true, text});
        setMessages(msgs);
    };
    //update messages when message is received
    useEffect(() => {
        if(socket.current){
            socket.current.on("msg-received", (text)=>{
                setArrivalMessage({fromSelf:false, text:text});
            })
        }
    }, [socket]);

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage]);
    }, [arrivalMessage]);

    //scrolls to bottom of the current messages
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    }, [messages]);




    return (
        <>
        { currentChat && (
            <>
            <div className="header text-2xl text-gray-600 flex items-center justify-center border-b border-gray-150 gap-4">
                <div className="header-avatar w-7 h-7 bg-blue-300 rounded-full flex items-center border border-gray-400">
                    <div className="text-center text-white w-full">{currentChat.username[0]}</div>
                </div>
                {currentChat.username}
            </div>
            <div className="chat-messages flex-col flex-grow overflow-y-auto">
               { messages.map((message) => {
                    return(
                        <div ref={scrollRef} key={uuidv4()} className="">
                            <div className={`message ${message.fromSelf ? "sender flex" : "receiver flex"} m-1 text-sm `}>
                                <div className={`content ${message.fromSelf ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-white" } 
                                                p-2 rounded-md border border-gray-200`}>
                                    <p className="">
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg}/>
            </>
        )}
        </>

      
    )
}

export default ChatContainer;