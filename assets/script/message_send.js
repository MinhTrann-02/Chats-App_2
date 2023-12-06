cc.Class({
    extends: cc.Component,

    properties: {
        messageSendNode: cc.Node,
        messageInput: cc.EditBox,
        messLong: cc.Prefab,
        messSort: cc.Prefab,
    },
    onLoad() {
        this.messageInput.focus();
        this.messageSendNode.active = false;
        this.messageInput.node.on('editing-return', this.onEnter, this);
    },

    onEnter() {
        if (this.messageInput.string.trim() !== '') {
            this.messageSendNode.active = true;

            if (this.messageInput.string.length > 45) {
                const newMessagePrefab = cc.instantiate(this.messLong);
                newMessagePrefab._children[2]._children[0]._components[0]._string = this.messageInput.string.trim();
                this.node.addChild(newMessagePrefab);
                this.messageSendNode.active = false;

            } else {
                const newMessagePrefab = cc.instantiate(this.messSort);
                newMessagePrefab._children[2]._children[0]._components[0]._string = this.messageInput.string.trim();
                this.node.addChild(newMessagePrefab);
                this.messageSendNode.active = false;
            }
            this.messageInput.string = '';

            this.scheduleOnce(() => {
                this.messageInput.blur();
                this.messageInput.focus();
            }, 0.1);
        }
    },
});
