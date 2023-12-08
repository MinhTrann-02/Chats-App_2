const TOTAL_AVATAR = 6;
const Module = require("module");

cc.Class({
    extends: cc.Component,

    properties: {
        loginPopup: cc.Node,
        userNameInput: cc.EditBox,
        avatarPopup: cc.Node,
        listAvatar: [cc.SpriteFrame],
        chatPopup: cc.Node,
    },

    onload() {
        this.loginPopup.active = true;
        this.avatarPopup.children[0].color = cc.Color.WHITE;
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
        this.dataUser = {
            id: '',
            userName: this.userNameInput.string,
            avatarOption: this.avatarOption,
            mg: ''
        }
        Module.setSharedData(this.dataUser);
        
        this.onMessageScreen();
    },

    onMessageScreen() {
        this.loginPopup.active = false;
        this.chatPopup.active = true;
    },
});