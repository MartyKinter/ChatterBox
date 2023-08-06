import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { allUsersRoute, host } from "../ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";
import jwt_decode from 'jwt-decode';


function Chat(){
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);


    //check if user is logged in, if not send to login page else decode token 
    //and save taken data as currentUser
    useEffect(() => {
        const token = localStorage.getItem('chat-app-user');
        if(!token){
          navigate('/login');
        }else{
          try{
            const decodedToken = jwt_decode(token);
            setCurrentUser(decodedToken);
            setIsLoaded(true);
          }catch(err){
            console.log("Error decoding token", err);
          }
        }
        
      }, [navigate]);

      //if logged in setup socket and add to socket user list
      useEffect(()=>{
        if(currentUser){
          socket.current = io(host);
          socket.current.emit("add-user", currentUser.id);
        }
      }, [currentUser])

      //get list of all users except current user from database to create contacts
      useEffect(() => {
        const fetchData = async () => {
          if (currentUser) {
            try {
              const response = await axios.get(`${allUsersRoute}/${currentUser.id}`);
              setContacts(response.data);
            } catch (error) {
              console.error('Error fetching contacts:', error);
            }
          } 
        };
        if(currentUser){
          fetchData();
        }
      }, [currentUser]);
    
    //keep track of which chat is selected
    const handleChatChange = (chat) => {
      setCurrentChat(chat);
    };

    return(
        <div className="flex h-screen">
            <div className="bg-white w-1/3">
              <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
            </div>
            <div className="flex flex-col bg-blue-50 w-2/3 p-2">
                  {isLoaded && currentChat === undefined ? 
                  <Welcome currentUser={currentUser}/> :
                  <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>}
            </div>
        </div>
    )
}

export default Chat;