const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const { username, password, devKey, env } = require('../credentials');
const BDC = require('../index')(username, password, devKey, env);

// deviceId & machineName are both required fields for the MFAAuthenticate endpoint
// these values are not referenced, but rather set arbitrarily by the developer
const deviceId = '123-456-789';
const machineName = 'MFAPhone';

(async () => {
    try {
        // retrieve orgId to pass in on Auth.login method to specify which org the user is logging into
        const orgs = await BDC.listOrgs();
        // login
        await BDC.Auth.login(orgs[0].orgId);
        // fetch the session info
        await BDC.Auth.getSessionInfo();

        // begin mfa flow, phone should receive text message
        const res = await BDC.Auth.mfaChallenge(false);
        const challengeId = res.challengeId;
        let token;
        let response;

        // input 6 digit token
        readline.question('Please enter you 6-digit code:', async code => {
            token = `${code.slice(0, 3)}-${code.slice(3)}`;
            // multifactor authenticate
            response = await BDC.Auth.mfaAuthenticate(
                challengeId,
                token,
                deviceId,
                machineName,
                true
            );

            console.log(response.mfaId, deviceId);

            // check if the mfaId you receive is trusted (This flow is working if it is trusted)
            console.log(await BDC.Auth.mfaStatus(response.mfaId, deviceId));
            // expected output:{ isTrusted: true }

            await BDC.Auth.logout();

            readline.close();
        });
    } catch (error) {
        console.log(error);
    }
})();
