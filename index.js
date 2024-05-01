const express = require('express');
const app = express();

const path = require("path")
const http = require('http')
const {Server} = require('socket.io')

// Serve socket.io.js directly from node_modules
app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/node_modules/socket.io/client-dist/socket.io.js'));
});



const server = http.createServer(app)
const io = new Server(server)


app.use(express.static(path.resolve('')))

let arr=[];
let playingArray =[];


io.on("connection",(socket)=>{
    console.log('a user connected');
    socket.on('find',(e)=>{
        if(e.name!= null){
            arr.push(e.name)

            if(arr.length>=2){
                let p1obj={
                    p1name:arr[0],
                    p1value:"X",
                    p1move:""
                }
                let p2obj={
                    p2name:arr[1],
                    p2value:"O",
                    p2move:""
                }

                let obj ={
                    p1:p1obj,
                    p2:p2obj
                }

                playingArray.push(obj);

                arr.slice(0,2);

                io.emit('find',{allPlayers:playingArray});


            }
        }
    })
})


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listen on port 3000
app.listen(4000, () => {
    console.log('Server is listening on port 4000...');
});
