const io = require('./index').io

module.exports = function(socket){
    console.log('Socket Id', socket.id)
}