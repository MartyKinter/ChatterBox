const MessageModel = require("../models/MessageModel");


const addMessage = async (req, res, next) => {
    try{
        const {text, from_user, to_user, sender_id} = req.body;
        let data = await MessageModel.create({text, from_user, to_user, sender_id});

        if(data) return res.json({msg: "Message added successfully"})
        return res.json({msg: "Failed to add message to database"})

    }catch(err){
        next(err);
    }
};

const getAllMessages = async (req, res, next) => {
    try{
        const {from_user, to_user} = req.body;
        const messages = await MessageModel.getMessagesBetweenUsers(from_user, to_user);
        const projectMessages = messages.map((msg)=>{
            return {
                id:msg.id,
                fromSelf: msg.sender_id === from_user,
                text: msg.text
            }
        });
        return res.json(projectMessages);
    }catch(err){
        next(err);
    }
};

module.exports = {
    addMessage,
    getAllMessages
}