const data = {
    id: 'sdasdasd',
    username: 'Minh Trần',
    avatarOption: '1',
    msg: 'Hello anh'
};

cc.Class({
    extends: cc.Component,

    properties: {
        // serverUrl: 'http://172.16.1.41:3000',
        serverUrl: 'http://192.168.1.36:3000',
        socketManager: require('SocketManager'),
        sendPrefab: [cc.Prefab],
        recivePrefab: [cc.Prefab],
        messInput: cc.EditBox,
        _myID: null
    },

    onLoad() {
        this.socketManager.myID((myID) => {
            this._myID = myID;
        });
        this.messInput.focus();
    },

    onEnter() {
        let messInput = this.messInput.string.trim();
        data.msg = messInput;
        data.id = this._myID;
        this.socketManager.sendToServer(data);

        this.socketManager.reciveToServer((data) => {
            this.newPrefab(data.id, data.msg);
        console.log('Load Prefab');

        }); 
        this.messInput.string = '';
    },

    newPrefab(id, message) {
        console.log('Create Prefab');
        let newMess = new cc.Node;
        if (id === this._myID) {
            this.newSendPrefab(newMess, message);
        } else {
            this.newRecivePrefab(newMess, message);
        }
    },

    newSendPrefab(newMess, message) {
        console.log('Done Send');
        if (message.length < 45 && message !== '') {
            newMess = cc.instantiate(this.sendPrefab[0]);
            newMess._children[1]._children[0]._components[0]._string = message;
        } else {
            newMess = cc.instantiate(this.sendPrefab[1]);
            newMess._children[1]._children[0]._components[0]._string = message;
        }
        this.node.addChild(newMess);
    },

    newRecivePrefab(newMess, message) {
        if (message.length < 45 && message !== '') {
            newMess = cc.instantiate(this.recivePrefab[0]);
            newMess._children[1]._children[0]._components[0]._string = message;
        } else {
            newMess = cc.instantiate(this.recivePrefab[1]);
            newMess._children[1]._children[0]._components[0]._string = message;
        }
        this.node.addChild(newMess);
    }
});