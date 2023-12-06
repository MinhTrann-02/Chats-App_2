const TOTAL_AVATAR = 6;
cc.Class({
    extends: cc.Component,

    properties: {
        loginPopup: cc.Node,
        userNameInput : cc.Node,
        avatarPopup: cc.Node,
    },

    onload () {
        this.loginPopup.active = true;
        this.avatarPopup.children[0].color = cc.Color.WHITE;
    },

    onSelectAvatar(event, avatarOption) {
        this.avatarPopup.children.forEach((avatar, index) => {
            avatar.color = index + 1 === Number(avatarOption) ? cc.Color.WHITE : cc.Color.GRAY;
        });
        this.avatarOption = avatarOption;
    },

    // start () {
    //     this.loginPopup = true;
    // },


    // update (dt) {},
});
