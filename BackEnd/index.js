

const express = require("express");

const app = express();

const cors = require("cors");

const conn = require("./db");


conn.connection.on("connected",(err)=>{

    if(err)
    {
        console.error("Connection Failed With DataBase : ");
    }

    else

    {
        console.log("Connection is Established Successfully!");
    }


})


app.use(express.json());

app.use(cors());

app.use("/tasks",require("./routes/user"));

app.use("/addTasks",require("./routes/user1"));



app.listen(5500,(err)=>{

    if(err)
    {
        console.error("SERVER couldn't Start!");
    }
    else
    {
        console.log("SERVER is Started!");
    }

})