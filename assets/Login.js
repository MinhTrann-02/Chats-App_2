//const io = require('socket.io-client');
const TOTAL_AVATAR = 6;
cc.Class({
    extends: cc.Component,

    properties: {
        loginPopup: cc.Node,
        userNameInput: cc.Node,
        avatarPopup: cc.Node,
    },

    onload() {
        // this.socket = io('http://your-server-address');
        this.node.on('login', this.onLogin.bind(this));
        this.socket.on('login', this.onLogin.bind(this));

        this.loginPopup.active = true;
        this.avatarPopup.children[0].color = cc.Color.WHITE;
    },

    onSelectAvatar(event, avatarOption) {
        this.avatarPopup.children.forEach((avatar, index) => {
            avatar.color = index + 1 === Number(avatarOption) ? cc.Color.WHITE : cc.Color.GRAY;
        });
        this.userInfo = {
            avatarOption: this.avatarOption,
            userName: this.userNameInput.string
        }
        this.avatarOption = avatarOption;
    },

    onLogin() {
        if (!this.userNameInput.string) {
            return window.alert("Please enter your user name!!");
        }
        if (this.userNameInput.string.length < 4) {
            return window.alert("Your user name is less than 4 characters");
        }
        this.userInfo = {
            avatarOption: this.avatarOption,
            userName: this.userNameInput.string
        }

    },

    onDestroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
    },
});
