/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

Auth Constructor
- Should throw an error if credentials object is malformed or incomplete
- Should instantiate with credentials property
- Should instantiate env property to the proper url based on which env is passed in

Auth.login
- Successfully retrieves and sets cookies on the Auth class instance 
- Throw a FailedRequestException if request is unsuccessful

Auth.getSessioninfo
- Successfully fetches session info
- Throw a FailedRequestException if request is unsuccessful

Auth.mfaChallenge
- successfully returns a challengeId
- Throw a FailedRequestException if request is unsuccessful

Auth.logout
- Successfully sets the cookies to undefined on the Auth class instance
- Throw a FailedRequestException if request is unsuccessful

*/
const {
    username,
    password,
    orgId,
    userId,
    devKey,
    env
} = require('../testConfig');
const BDC = require('../../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');

describe('Auth', () => {
    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
    });

    describe('constructor', () => {
        it('should throw an error if credentials object is malformed or incomplete', () => {
            // test for when credentials object is undefined
            let errorMessage = 'No error thrown.';
            let auth;

            try {
                auth = new Auth();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'credentials is undefined - Auth instance requires a credentials object'
            );

            // test for when credentials.userName is undefined
            const credentials = {
                password: 'password',
                devKey: 'devKey',
                env: 'sandbox'
            };

            try {
                auth = new Auth(credentials);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'credentials object is missing userName property'
            );

            // test for when credentials.password is undefined
            credentials.userName = 'userName';
            credentials.password = undefined;

            try {
                auth = new Auth(credentials);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'credentials object is missing password property'
            );

            // test for when credentials.devKey is undefined
            credentials.password = 'password';
            credentials.devKey = undefined;

            try {
                auth = new Auth(credentials);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'credentials object is missing devKey property'
            );

            // test for when credentials.env is undefined
            credentials.devKey = 'devKey';
            credentials.env = undefined;

            try {
                auth = new Auth(credentials);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'credentials object is missing env property'
            );
        });

        it('should instantiate with credentials property', () => {
            const credentials = {
                userName: 'userName',
                password: 'password',
                devKey: 'devKey',
                env: 'sandbox'
            };

            const auth = new Auth(credentials);

            expect(auth._credentials).toEqual({
                userName: 'userName',
                password: 'password',
                devKey: 'devKey',
                env: 'sandbox'
            });
        });

        it('should instantiate env property to the proper url based on which env is passed in', () => {
            /* there is a switch case in the constructor where the env property is set based on the
            name of the environment passed in when Auth Object instance is instantiated- the following
            expect statements test for each case of the switch statement */

            const credentials = {
                userName: 'userName',
                password: 'password',
                devKey: 'devKey',
                env: 'sandbox'
            };

            // test for sandbox case
            let auth = new Auth(credentials);
            expect(auth.env).toEqual('https://app-sandbox.bill.com/api/v2');

            // update credentials.env and test for app-test case
            credentials.env = 'app-test';
            auth = new Auth(credentials);
            expect(auth.env).toEqual('https://app-test.bill.com/api/v2');

            // update credentials.env and test for default case
            credentials.env = 'not a real environment';
            auth = new Auth(credentials);
            expect(auth.env).toEqual('https://app-sandbox.bill.com/api/v2');
        });
    });

    describe('login method', () => {
        it('should return the API response containing the orgId which was passed in', async () => {
            const res = await BDC.Auth.login(orgId);
            expect(res.orgId).toEqual(orgId);
        });

        it('should successfully set cookies on the Auth class instance', async () => {
            expect(BDC.Auth._requestCredentials.cookies).not.toBeUndefined();
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Auth.login('fakeOrganizationId');
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid parameter value for parameter,value: orgId, fakeOrganizationId.'
            );
        });
    });

    describe('getSessionInfo method', () => {
        it('should successfully return session info: userId & orgId', async () => {
            const res = await BDC.Auth.getSessionInfo();

            expect(res.organizationId).toEqual(orgId);
            expect(res.userId).toEqual(userId);
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            BDC.Auth._requestCredentials.devKey = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Auth.getSessionInfo();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Developer key must be specified.');

            // reset the BDC.Auth._requestCredentials.devKey to its original value
            BDC.Auth._requestCredentials.devKey = devKey;
        });
    });

    describe('mfaChallenge method', () => {
        it('should successfully return a challengeId', async () => {
            const res = await BDC.Auth.mfaChallenge(false);
            expect(res.challengeId).not.toBeUndefined();
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            BDC.Auth._requestCredentials.devKey = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Auth.mfaChallenge(false);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Developer key must be specified.');

            // reset the BDC.Auth._requestCredentials.devKey to its original value
            BDC.Auth._requestCredentials.devKey = devKey;
        });
    });

    describe('mfaAuthenticate method', () => {
        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            BDC.Auth._requestCredentials.devKey = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Auth.mfaAuthenticate(
                    'challengeId',
                    '123-456',
                    'deviceId',
                    'machineName',
                    true
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Developer key must be specified.');

            // reset the BDC.Auth._requestCredentials.devKey to its original value
            BDC.Auth._requestCredentials.devKey = devKey;
        });
    });

    describe('mfaStatus method', () => {
        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            BDC.Auth._requestCredentials.devKey = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Auth.mfaStatus('mfaId', 'deviceId');
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Developer key must be specified.');

            // reset the BDC.Auth._requestCredentials.devKey to its original value
            BDC.Auth._requestCredentials.devKey = devKey;
        });
    });

    describe('logout method', () => {
        it('should successfully set cookies on the Auth class instance to undefined', async () => {
            await BDC.Auth.login(orgId);
            expect(BDC.Auth._requestCredentials).not.toBeUndefined();
            await BDC.Auth.logout();
            expect(BDC.Auth._requestCredentials.cookies).toBeUndefined();
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Auth.login(orgId);
                BDC.Auth._requestCredentials.devKey = undefined;

                await BDC.Auth.logout();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Developer key must be specified.');
        });
    });

    console.log(
        '\x1b[31m',
        'In order to test MFA flow please run the mfaFlowTest.js script'
    );

    console.log('\x1b[30m', '');
});
