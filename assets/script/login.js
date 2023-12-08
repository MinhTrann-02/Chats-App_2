const data = {
    id: '',
    username: '',
    avatarOption: '',
    msg: ''
};
const Module = require("module");

cc.Class({
    extends: cc.Component,

    properties: {
        socketManager: require('SocketManager'),
        loginPopup: cc.Node,
        userNameInput: cc.EditBox,
        avatarPopup: cc.Node,
        listAvatar: [cc.SpriteFrame],
        chatPopup: cc.Node,
        _myID: null
    },

    onLoad() {
        this.socketManager.myID((myID) => { this._myID = myID });
    },

    onSelectAvatar(event, avatarOption) {
        this.avatarPopup.children.forEach((avatar, index) => {
            avatar.color = index + 1 === Number(avatarOption) ? cc.Color.WHITE : cc.Color.GRAY;
        });
        this.avatarOption = avatarOption - 1;
    },

    onLogin() {
        if (!this.userNameInput.string) {
            return window.alert("Please enter your user name!!");
        }
        if (this.userNameInput.string.length < 2) {
            return window.alert("Your user name is less than 2 characters");
        }
        if (this.avatarOption == undefined) this.avatarOption = 0;
        this.register(data);
        this.socketManager.registerToServer(data);
        Module.setSharedData(data);
        this.onMessageScreen();
    },

    onMessageScreen() {
        this.loginPopup.active = false;
        this.chatPopup.active = true;
    },

    register() {
        data.id = this._myID;
        data.username = this.userNameInput.string;
        data.avatarOption = this.avatarOption;
    },
});