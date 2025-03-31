

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const { get } = require("http");
const { render } = require("ejs");
const methodOverride = require("method-override"); // Importing method-override library to support HTTP verbs such as PUT and DELETE in forms

app.set("view engine", "ejs");                        //2nd
app.set("views", path.join(__dirname, "views"));      //1st
app.use(express.static(path.join(__dirname, "public"))); //3rd
app.use(express.urlencoded({ extended: true })); //4th
app.use(methodOverride("_method")); //5th

main()
.then(() =>{
    console.log("Connected to MongoDB");
} )
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatup');
}

//chats route
app.get("/chats", async(req, res) => { // Route to handle GET requests to "/chats"
  let chats = await Chat.find(); // Fetches all chat documents from the database  
  res.render("index.ejs", {chats}); // Renders the 'chats' view when the '/chats' route is accessed
});

//new route
app.get("/chats/new", (req, res) => { // Route to handle GET requests to "/chats/new"
  res.render("new.ejs"); // Renders the 'new' view when the '/chats/new' route is accessed
});

//create route
app.post("/chats", (req, res) => { // Route to handle POST requests to "/chats"
  let { from, to, msg } = req.body; // Destructures the request body to get 'from', 'to', and 'msg' values
  let newChat = new Chat({ // Creates a new instance of the Chat model with the provided data
    from: from,
    to: to,
    msg: msg,
  });

  newChat
  .save()
  .then((res) => { // Saves the new chat document to the database  
    console.log("Saved chat"); // Logs the saved document if insertion was successful
  })
  .catch((err) => { // Logs any error that occurs while saving
    console.error("Error saving chat:", err);
  });
 res.redirect("/chats"); 
});

//edit route
app.get("/chats/:id/edit", async(req, res) => { // Route to handle GET requests to "/chats/:id/edit"
  let { id } = req.params; // Extracts the 'id' parameter from the request URL
  let chat = await Chat.findById(id); // Finds the chat document by its ID
  res.render("edit.ejs", {chat}); // Renders the 'edit' view when the '/chats/:id/edit' route is accessed
});

//Update route
app.put("/chats/:id", async(req, res) => { // Route to handle PUT requests to "/chats/:id"
  let { id } = req.params; // Extracts the 'id' parameter from the request URL
  let { msg : new_msg } = req.body; // Destructures the request body to get 'from', 'to', and 'msg' values
  let udchat = await Chat.findByIdAndUpdate(id, { // Finds the chat document by its ID and updates it with new data
    msg: new_msg,}, 
    {runValidators: true}, {new: true}); // Ensures that the update adheres to the schema validation rules
  console.log(udchat);              // Logs the updated chat document
  res.redirect("/chats");          // Redirects to the '/chats' route after updating
});

//Delete route
app.delete("/chats/:id", async(req, res) => { // Route to handle DELETE requests to "/chats/:id"
  let { id } = req.params; // Extracts the 'id' parameter from the request URL
  let dechat = await Chat.findByIdAndDelete(id); // Finds the chat document by its ID and deletes it
  console.log(dechat); // Logs the deleted chat document
  res.redirect("/chats"); // Redirects to the '/chats' route after deletion
});
// chat1.save()
//     .then((res) => {
//         console.log("Saved chat:", res); // Logs the saved document if insertion was successful
//     })
//     .catch((err) => {
//         console.error("Error saving chat:", err); // Logs any error that occurs while saving
//     });
 
//     Chat.find({}, (err, chats) => {
//       if (err) {
//           console.error("Error fetching chats:", err);
//       } else {
//           console.log("Chats in the database:", chats);
//       }
//   });
app.get("/", (req, res) => {
  res.send("this is working");
})

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});