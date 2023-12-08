const Module = require("module");

cc.Class({
    extends: cc.Component,

    properties: {
        socketManager: require('SocketManager'),
        sendPrefab: [cc.Prefab],
        recivePrefab: [cc.Prefab],
        connectedPrefab: cc.Prefab,
        messInput: cc.EditBox,
        avatarList: [cc.SpriteFrame],
        scrollView: cc.ScrollView,
    },

    onLoad() {
        this.messInput.focus();
        this.dataLogin = Module.getSharedData();
        let newMess = new cc.Node;

        this.socketManager.connectedToServer((data) => {
            this.scheduleOnce(() => {
                let notification = data.split(' ');
                let name = notification[0];
                if (this.dataLogin.username !== name) {
                    this.newConnectedPrefab(newMess, data);
                }
            }, 0.1);
        });

        this.socketManager.reciveToServer((data) => {
            let avt = data.avatarOption;
            if (data.id !== this.dataLogin.id) {
                this.newRecivePrefab(newMess, data.msg, data.username, avt);
            } else {
                this.newSendPrefab(newMess, data.msg, avt);
            }
            this.scrollView.scrollToBottom(0.2);
        });
    },

    onEnter() {
        let messInput = this.messInput.string.trim();
        if (messInput != '') {
            this.dataLogin.msg = messInput;

            this.socketManager.sendToServer(this.dataLogin);
            this.messInput.string = '';
        }
        this.scheduleOnce(() => {
            this.messInput.focus();
        }, 0.1);
    },

    newConnectedPrefab(newMess, name) {
        newMess = cc.instantiate(this.connectedPrefab);
        newMess._children[0]._components[0]._string = name;
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

    newRecivePrefab(newMess, message, username, avt) {
        if (message.length < 33 && message !== '') {
            newMess = cc.instantiate(this.recivePrefab[0]);
            newMess._children[0]._children[0]._components[0]._spriteFrame = this.avatarList[avt];
            newMess._children[0]._components[0]._string = username;
            newMess._children[1]._children[0]._components[0]._string = message;
        } else {
            newMess = cc.instantiate(this.recivePrefab[1]);
            newMess._children[0]._children[0]._components[0]._spriteFrame = this.avatarList[avt];
            newMess._children[0]._components[0]._string = username;
            newMess._children[1]._children[0]._components[0]._string = message;
        }
        this.node.addChild(newMess);
    },
});