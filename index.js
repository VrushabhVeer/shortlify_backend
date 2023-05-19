const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
const connection = require("./connection/db")
const cors = require("cors")
app.use(cors({origin:"*"}));
const {urlRoute} = require("./routes/urlRoute")
const {URL_model} = require("./models/urlModel")

app.use("/url", urlRoute)

app.get("/:shortid", async(req, res)=>{
    try {
        const data = await URL_model.findOne({shortURL: req.params.shortid})
        if (!data) return res.status(404).json({msg: "URL not found"})

        let click = Number(data.clicks)
        data.clicks = click+1;
        await data.save()

        res.redirect(data.originalURL)
    } catch (error) {
        console.log(error)
    }
})

let PORT = 8012 || process.env.PORT
app.listen(PORT, async ()=>{
    try {
        await connection
        console.log("connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
})