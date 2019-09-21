/* Credentials */
const BDC_username = "bay+sandbox.rice@edu.";
const BDC_password = "Bdctest123";
const BDC_devKey = "01JFJIGOPULHADWJD201";
const BDC_env = "sandbox";
const BDC_orgId = '3D00801ZVAIUEZDYTOIme7';


const BDC = require('./../BDCClientLibrary')(username, password, devKey, env);

(async () => {
    try {
        await BDC.Auth.login(orgId);

    } catch (err) {
        console.log(err);
    }
})();