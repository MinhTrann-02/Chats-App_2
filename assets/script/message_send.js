// const io = require('socket.io-client');

cc.Class({
    extends: cc.Component,

    properties: {
        messageSendNode: cc.Node,
        avatarSprite: cc.Sprite,
        messageLabel: cc.Label,
        messageInput: cc.EditBox,
        avatar: [cc.SpriteFrame]
    },
    onLoad() {

        this.messageSendNode.active = false;
        this.messageInput.node.on('editing-return', this.onEnter, this);
    },

    onEnter() {
        if (this.messageInput.string.trim() !== '') {
            this.messageSendNode.active = true;

            const newMessagePrefab = cc.instantiate(this.messageSendNode);
            this.messageSendNode.active = false;

            newMessagePrefab._children[0]._components[0]._spriteFrame = this.avatar[10];
            newMessagePrefab._children[2]._components[0]._string = this.messageInput.string;

            this.node.addChild(newMessagePrefab);
            this.messageInput.string = '';
            this.messageInput.blur();
        }
    },

    // update() {
    //     this.messageInput.focus();
    // }
});
