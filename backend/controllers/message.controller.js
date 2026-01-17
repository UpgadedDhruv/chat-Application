import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // fetching receiver id from url params
    const senderId = req.user._id; // user is attached to req object in protectRoute middleware.

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel.
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json({ newMessage });
  } catch (error) {
    console.log("error in sendMessage controller: ", error.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};


export const getMessages = async (req, res) => {
  try {
    const {id: userToChatId}= req.params;
    const senderId= req.user._id;

    const conversation= await Conversation.findOne({
      participants: {$all : [senderId, userToChatId]},
    }).populate("messages");//Mongoose automatically fetches the actual Message documents from the Message collection and replaces those IDs with the full message objects

    if(!conversation){
      return res.status(200).json([]); // no conversation exists between these two users
    }

    const messages= conversation.messages ;
     
    res.status(200).json(messages) ; 
}


catch(err){
     console.log("error in getMessages controller:", err.message)
     res.status(500).json({error : "internal server erorr "});


}
}

