import React, {useState, useEffect} from "react";
import "./contacts.css"

function Contacts({contacts, currentUser, changeChat}){
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if(currentUser){
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }


    return (
        <div className="flex flex-col h-screen bg-white p-2">
        <div className="contacts flex-grow">
          {contacts.map((contact, idx) => (
            <div
              className={`contact ${idx === currentSelected ? "selected" : ""} border-b border-gray-300 mb-2`}
              key={idx}
              onClick={()=> changeCurrentChat(idx, contact)}
            >
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="current-user mt-2">
          <h1 className="text-2xl">{currentUserName}</h1>
        </div>
      </div>
    )
}

export default Contacts;