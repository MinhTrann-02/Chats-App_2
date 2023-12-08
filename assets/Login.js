//const io = require('socket.io-client');
const TOTAL_AVATAR = 6;
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
        this.avatarOption = avatarOption;
    },

    onLogin() {
        if (!this.userNameInput.string) {
            return window.alert("Please enter your user name!!");
        }
        if (this.userNameInput.string.length < 2) {
            return window.alert("Your user name is less than 2 characters");
        }
        this.userInfo = {
            userName: this.userNameInput.string,
            avatarOption: this.avatarOption
        }
        cc.log(this.userInfo)
        this.onMain();
    },

    onMain() {
        // this.loginPopup.active = false;
        // this.chatPopup.active = true;
        // this.displayUserInfo();
        // cc.log(this.displayUserInfo())
    },

    // displayUserInfo() {
    //     const avatarOption = this.userInfo.avatarOption;
    //     const userName = this.userInfo.userName;
    //     this.userAvatar.getComponent(cc.Sprite).spriteFrame = this.listAvatar[avatarOption - 1];
    //     this.userName.getComponent(cc.Label).string = `${userName}`;
    // },
});
