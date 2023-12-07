cc.Class({
    extends: cc.Component,

    properties: {
        serverUrl: 'http://172.16.1.41:3000',
        socketManager: require('SocketManager'),
        sendPrefab: [cc.Prefab],
        recivePrefab: [cc.Prefab],
        messInput: cc.EditBox,
        _reciveLabel: null,
        _myID: null
    },

    onLoad() {
        this.socketManager.myID((myID) => {
            this._myID = myID;
        });
        this.messInput.focus();
    },

    onEnter() {
        let mes = this.messInput.string.trim();
        this.socketManager.sendToServer(mes);

        this.socketManager.reciveToServer((data) => {
            this._reciveLabel = data.msg;
            this.newPrefab(data.id, this._reciveLabel);
            console.log('1:' + this._reciveLabel);
            this.messInput.string = '';
        });
    },

    newPrefab(id, message) {
        console.log(message);
        let newMess = new cc.Node;
        if (id == this._myID) {
            this.newSendPrefab(newMess, message);
        } else {
            this.newRecivePrefab(newMess, message);
        }
        this.node.addChild(newMess);
    },

    newSendPrefab(newMess, message) {
        if (message.length < 45 && message !== '') {
            newMess = cc.instantiate(this.sendPrefab[0]);
            newMess._children[1]._children[0]._components[0]._string = message;
        } else {
            newMess = cc.instantiate(this.sendPrefab[1]);
            newMess._children[1]._children[0]._components[0]._string = message;
        }
    },

    newRecivePrefab(newMess, message) {
        if (message.length < 45 && message !== '') {
            newMess = cc.instantiate(this.recivePrefab[0]);
            newMess._children[1]._children[0]._components[0]._string = message;
        } else {
            newMess = cc.instantiate(this.recivePrefab[1]);
            newMess._children[1]._children[0]._components[0]._string = message;
        }
    }
});