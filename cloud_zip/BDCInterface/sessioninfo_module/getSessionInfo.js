module.exports = async () => {
    try {
        const BDC = await require('../auth_module/authentication.js')();
        return await BDC.Auth.getSessionInfo();
    } catch (err) {
        console.log(err);
    }
};
