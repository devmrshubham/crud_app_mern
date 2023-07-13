const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./Router/User")
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static((__dirname + "/public")))

//api calling

app.use("/user", UserRouter)

mongoose.connect("mongodb+srv://shubhamdewangan:1997@cluster0.dhzvpk4.mongodb.net/?retryWrites=true&w=majority")
    .then(
        (success) => {
            console.log('yess connected')
            app.listen(5000, () => {
                console.log(`this server is running on at  http://localhost:${5000}`)
            })
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
