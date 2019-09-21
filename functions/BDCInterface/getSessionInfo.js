module.exports = async () => {
    try {
        const BDC = await require('./authentication.js')();
        return await BDC.Auth.getSessionInfo();
    } catch (err) {
        console.log(err);
    }
};
