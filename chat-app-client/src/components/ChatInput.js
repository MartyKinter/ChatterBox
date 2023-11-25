import React, {useState} from "react";

function ChatInput({handleSendMsg}){
    const [text, setText] = useState("");


    const sendChat = (evt) => {
        evt.preventDefault();
        if(text.length>0){
            handleSendMsg(text);
            setText('');
        }
    }

    return (
    <form className="flex gap-2 m-2 justify-center" onSubmit={(evt)=>sendChat(evt)}>
    <input className="bg-white flex-grow border rounded-sm p-2"
           type="text" 
           placeholder="Type your message here" 
           value={text}
           onChange={(evt)=>setText(evt.target.value)}/>

    <button className="bg-blue-500 p-2 text-white rounded-sm" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
    </button>
    </form>
    )
}

export default ChatInput;