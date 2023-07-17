const express = require("express");
const cors = require("cors");
const http = require('http');
const {Server} = require('socket.io');
const app = express();
app.use(cors());


app.get('/sender',(req,res)=>{
    res.sendFile(__dirname+'/newSo.html')
})
app.get('/receiver',(req,res)=>{
    res.sendFile(__dirname+'/socket.html')
})

const server = http.createServer(app);


const io = new Server(server);
io.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(data);
        io.emit('receive',data)
    })
})


server.listen(process.env.PORT || 5000 ,()=>{
    console.log('[server] running on port',5000);
});