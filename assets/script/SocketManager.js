const io = require('socket.io-client');

cc.Class({
    extends: cc.Component,

    properties: {
        serverUrl: 'http://172.16.1.41:3000',
    },

    onLoad() {
        this.connectToServer();
    },

    onDestroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
    },

    connectToServer() {
        this.socket = io.connect(this.serverUrl);
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    },

    myID(callback){
        this.socket.on('connect', () => {
            callback(this.socket.id)
        });
    },

    sendToServer(message) {
        if (this.socket && this.socket.connected) {
            this.socket.emit("send", message);
        }
    },

    reciveToServer(callback) {
        this.socket.on("receive", (data) => {
            callback(data)
        });
    },
});
