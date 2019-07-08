var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var socket = require('socket.io');
const {User} = require('./models/User')
var app = express();

app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/reactChat');


app.post('/api/user/register',(req,res)=>{
    const user = new User(req.body);
    
    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})
app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})
app.get('/api/getUser',(req,res)=>{
    let id = req.query.id;
  
    User.findOne({'uid':id},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
});
server = app.listen(3231, function(){
    console.log('server is running on port  3231')
});
io = socket(server);
let users = [];
io.on('connection', (socket) => {
 
    

  console.log(socket.id)
    // TYping notification
    socket.on('TYPING',(e)=>{
        socket.broadcast.emit('TYPING_INFO',e);
    })
    socket.on('NOT_TYPING',(e)=>{
        socket.broadcast.emit('NO_TYPING',e);
    })
    

    socket.on('SEND_MESSAGE', function(data){

       users.push(
           
               socket.id,
            
           )
       
         console.log(users)
        console.log(data.socketId in users)
        
       io.to(data.socketId).emit('RECEIVE_MESSAGE', data);
      //  io.emit('RECEIVE_MESSAGE', data);
    })


    
    socket.on('close',()=>{
        console.log('User left!');
    })
  
});





