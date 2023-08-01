import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { allUsersRoute } from "../ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";


function Chat(){

    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
          if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
          } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            setIsLoaded(true);
          }
        };
      
        fetchData();
      }, [navigate]);


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
                  <ChatContainer currentChat={currentChat}/>}
            </div>
        </div>
    )
}

export default Chat;