import React, {useState, useEffect} from "react";
import Logout from "./Logout";

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
        <div className="contacts-heading flex flex-col h-96 sm:h-screen bg-white w-screen sm:w-full">
            <div className="flex gap-2 text-blue-600 font-bold p-4 text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                </svg>
                <span className="">
                ChatterBox
                </span>
            </div>
        <div className="contacts-list flex-grow overflow-y-auto">
          {contacts.map((contact, idx) => (
            <div
              className={`contact ${idx === currentSelected ? "bg-blue-50" : ""} 
              border-b border-gray-100 py-2 pl-4 flex items-center gap-2 cursor-pointer`}
              key={idx}
              onClick={()=> changeCurrentChat(idx, contact)}>
                <div className="contact-avatar w-10 h-10 bg-blue-300 rounded-full flex items-center border border-gray-400">
                    <div className="text-center text-white w-full uppercase">{contact.username[0]}</div>
                </div>
                <div className="username text-gray-700">
                    <span>{contact.username}</span>
                </div>
            </div>
          ))}
        </div>
        <div className="current-user p-3 px-8 mt-2 flex items-center border-t border-gray-200 text-center justify-center">
          <div className="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {currentUserName} 
            </div>
            <Logout/>
        </div>
      </div>
    )
}

export default Contacts;