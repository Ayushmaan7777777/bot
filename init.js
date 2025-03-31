const mongoose = require("mongoose"); // Importing mongoose library to interact with MongoDB
const Chat = require("./models/chat.js"); // Importing the Chat model defined in models/chat.js

main()
.then(() =>{
    console.log("Connected to MongoDB");
} )
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatup');
}

 let allChats = ([
    {
        from: "John",
        to: "Doe",
        msg: "Hello Doe",
    },
    {
        from: "Jane",
        to: "Smith",
        msg: "Hi Smith",
    },
    {from: "Joh",
    to: "Doe",
    msg: "Hello Doe",
},
    {
        from: "ane",
        to: "mith",
        msg: "BYE Smith",
    },
    {
        from: "Jooh",
        to: "Dooe",
        msg: "Hellooo Doe",
    },
    {
        from: "Jne",
        to: "Smth",
        msg: "Hi mith",
    },
    {
        from: "Jh",
        to: "De",
        msg: "Hllo Doe",
    },

]);

Chat.insertMany(allChats); // Inserting multiple chat documents into the database
