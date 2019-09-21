/* Credentials */
const BDC_username = "bay+sandbox@rice.edu";
const BDC_password = "Billtest123";
const BDC_devKey = "01JFJIGOPULHADWJD201";
const BDC_env = "sandbox";
const BDC_orgId = '00801ZVAIUEZDYTOIme7';


const BDC = require('./../BDCClientLibrary')(BDC_username, BDC_password, BDC_devKey, BDC_env);

(async () => {
    try {
        await BDC.Auth.login(BDC_orgId);

    } catch (err) {
        console.log(err);
    }
})();
