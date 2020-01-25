import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.102:3333/',
{
    autoConnect: false,

});

function connect(){
    socket.connect();
}

function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
};