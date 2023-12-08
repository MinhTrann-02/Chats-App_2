const data = {
    id: '',
    userName: '',
    avatarOption: '',
    msg: ''
};
const Module = require("module");

cc.Class({
    extends: cc.Component,

    properties: {
        serverUrl: 'https://sv-24fd.onrender.com',
        socketManager: require('SocketManager'),
        sendPrefab: [cc.Prefab],
        recivePrefab: [cc.Prefab],
        connectedPrefab: cc.Prefab,
        messInput: cc.EditBox,
        avatarList: [cc.SpriteFrame],
        scrollView: cc.ScrollView,
        _myID: null
    },

    onLoad() {
        this.dataLogin = Module.getSharedData();
        let newMess = new cc.Node;
        this.scheduleOnce(() => {
            this.newConnectedPrefab(newMess, this.dataLogin.userName);
        }, 0.1);

        this.messInput.focus();
        this.socketManager.myID((myID) => { this._myID = myID });
        this.socketManager.reciveToServer((data) => {
            let avt = data.avatarOption;
            if (data.id !== this._myID) {
                this.newRecivePrefab(newMess, data.msg, data.userName, avt);
            } else {
                this.newSendPrefab(newMess, data.msg, avt);
            }
            this.scrollView.scrollToBottom(0.2);
        });
    },

    onEnter() {
        let messInput = this.messInput.string.trim();
        if (messInput != '') {
            data.id = this._myID;
            data.userName = this.dataLogin.userName;
            data.avatarOption = this.dataLogin.avatarOption;
            data.msg = messInput;
            this.socketManager.sendToServer(data);
            this.messInput.string = '';
        }
        this.scheduleOnce(() => {
            this.messInput.focus();
        }, 0.1);
    },

    newConnectedPrefab(newMess, name) {
        newMess = cc.instantiate(this.connectedPrefab);
        newMess._children[0]._components[0]._string = `${name} đã kết nối`;
        this.node.addChild(newMess);
    },

    newSendPrefab(newMess, message, avt) {
        if (message.length < 33 && message !== '') {
            newMess = cc.instantiate(this.sendPrefab[0]);
            newMess._children[0]._children[0]._components[0]._spriteFrame = this.avatarList[avt];
            newMess._children[1]._children[0]._components[0]._string = message;
        } else {
            newMess = cc.instantiate(this.sendPrefab[1]);
            newMess._children[0]._children[0]._components[0]._spriteFrame = this.avatarList[avt];
            newMess._children[1]._children[0]._components[0]._string = message;
        }
        this.node.addChild(newMess);
    },

    newRecivePrefab(newMess, message, userName, avt) {
        if (message.length < 33 && message !== '') {
            newMess = cc.instantiate(this.recivePrefab[0]);
            newMess._children[0]._children[0]._components[0]._spriteFrame = this.avatarList[avt];
            newMess._children[0]._components[0]._string = userName;
            newMess._children[1]._children[0]._components[0]._string = message;
        } else {
            newMess = cc.instantiate(this.recivePrefab[1]);
            newMess._children[0]._children[0]._components[0]._spriteFrame = this.avatarList[avt];
            newMess._children[0]._components[0]._string = userName;
            newMess._children[1]._children[0]._components[0]._string = message;
        }
        this.node.addChild(newMess);
    },
});