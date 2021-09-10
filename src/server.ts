import express, { response } from "express"


const app = express()

app.get("/", (resquest, response) => {
    return response.json({
        message:"Hello World"
    })
})
app.post("/users", (resquest, response) => {
    return response.json({
        users: "Airton Martins"
    })
})
app.listen(3333, () => console.log("Server is running on port 3333"))