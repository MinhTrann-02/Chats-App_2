cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label,
    },

    setText(newMes) {
        this.text.string = newMes;
    }
});
