let sharedData = {};

module.exports = {
    setSharedData(data) {
        sharedData = data;
    },
    getSharedData() {
        return sharedData;
    },
    addToSharedData(key, value) {
        sharedData[key] = value;
    },
    getKeyValue(key) {
        return sharedData[key];
    },
};