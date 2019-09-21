const util = require('./util');
const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * Auth class houses the credentials necessary to make successful calls, and holds methods for user
 * authentication and fetching session information.
 *
 * @param {object}  credentials  object containing the userName, password, devKey, and env parameters
 *
 * @throws {error} an error is thrown if the credentials object is not defined
 */

// class which holds credentials and instance methods regarding authentication and session information
class Auth {
    // instantiate class with credentials
    constructor(credentials) {
        // throw error if credentials object is undefined
        if (!credentials) {
            throw new Error(
                'credentials is undefined - Auth instance requires a credentials object'
            );
        }

        // throw error if credentials object is incomplete
        if (!credentials.userName) {
            throw new Error('credentials object is missing userName property');
        } else if (!credentials.password) {
            throw new Error('credentials object is missing password property');
        } else if (!credentials.devKey) {
            throw new Error('credentials object is missing devKey property');
        } else if (!credentials.env) {
            throw new Error('credentials object is missing env property');
        }

        this._credentials = credentials;

        // set env url based on the env value they initialize the BDC class with
        switch (credentials.env) {
            case 'sandbox':
                this.env = 'https://app-sandbox.bill.com/api/v2';
                break;

            case 'app-test':
                this.env = 'https://app-test.bill.com/api/v2';
                break;

            default:
                this.env = 'https://app-sandbox.bill.com/api/v2';
                break;
        }

        this.clientLibrary = 'NODEJS12_VERSION_0.0.1';

        this._requestCredentials = {
            client_library: this.clientLibrary,
            cookies: undefined,
            devKey: undefined
        };
    }

    /**
     * Validates the user credentials. Upon success, the session information is stored and returned along with the orgId, apiEndPoint, and usersId.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208197226-Login" target="_blank">Login</a>
     *
     * @param  {string} orgId                    the orgId specifies which organization to login to
     * @param  {string} mfaId                    an optional argument to be passed in along with a deviceId to login and be multi factor authenticated
     * @param  {string} deviceId                 an optional argument to be passed in along with a trusted mfaId to login and be multi factor authenticated
     *
     * @return {object}                          an object which includes the sessionId, orgId, apiEndPoint, and usersId
     *
     * @throws {MissingRequiredFieldException}   this exception is thrown if orgId is not defined
     * @throws {FailedRequestException}          this exception is thrown if the request fails - exception includes error message and error code
     */

    // method which hits the logs in the user and sets cookies on the credentials
    async login(orgId, mfaId, deviceId) {
        if (!orgId) {
            throw new MissingRequiredFieldException('orgId');
        }

        const credentials = {
            userName: this._credentials.userName,
            password: this._credentials.password,
            orgId,
            devKey: this._credentials.devKey
        };

        // only add mfaId & deviceId to credentials object if they are passed in
        if (mfaId && deviceId) {
            credentials.mfaId = mfaId;
            credentials.deviceId = deviceId;
        }

        const res = await util.makeRequest(
            `${this.env}/Login.json`,
            credentials
        );

        this._requestCredentials.cookies = res.cookies;
        this._requestCredentials.devKey = this._credentials.devKey;

        return res.data;
    }

    /**
     * Logs out the user that is currently signed in. Upon success, deletes the session information that was stored.
     * If the request fails, the FailedRequestException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/215407283-Logout" target="_blank">Logout</a>
     *
     * @return {object}                  an empty object
     *
     * @throws {FailedRequestException}  this exception is thrown if the request fails - exception includes error message and error code
     */

    // method which logs out the user and sets the cookies to be undefined on the credentials object
    async logout() {
        const res = await util.makeRequest(
            `${this.env}/Logout.json`,
            this._requestCredentials
        );

        this._requestCredentials.cookies = undefined;
        this._requestCredentials.devKey = undefined;

        return res.data;
    }

    /**
     * Gets the organization ID and user ID of the user that is currently logged in.
     * If the request fails, the FailedRequestException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/213911126-GetSessionInfo" target="_blank">Get Session Information</a>.
     *
     * @return {object}                   an object which includes the organization ID and user ID
     *
     * @throws {FailedRequestException}   this exception is thrown if the request fails - exception includes error message and error code
     */

    // method which fetches session info, specifically the userId & organizationId
    async getSessionInfo() {
        const res = await util.makeRequest(
            `${this.env}/GetSessionInfo.json`,
            this._requestCredentials
        );

        return res.data;
    }

    /**
     * Multi Factor Authentication (MFA) is required to call the methods that pay bills, send network invitations,
     * send vendor invitations, and manage vendor bank accounts. This method generates and returns a challenge ID,
     * and sends a token to the user’s registered mobile device.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/115000169503-MFAChallenge" target="_blank">Create MFA Challenge ID</a>.
     *
     * @param {boolean} useBackup                argument which determines whether the token needs to be sent to the primary mobile device
     *                                           [value = false] or back up mobile device [value = true]
     *
     * @return {object}                          an object which includes a challenge ID
     *
     * @throws {MissingRequiredFieldException}   this exception is thrown if useBackup is not defined
     * @throws {FailedRequestException}          this exception is thrown if the request fails - exception includes error message and error code
     */

    // method which hits the mfaChallenge API endpoint. Sends a text to one's mfa device and returns a challenge Id in the response
    async mfaChallenge(useBackup) {
        if (useBackup === undefined) {
            throw new MissingRequiredFieldException('useBackup');
        }

        const data = {
            data: `{
                "useBackup": ${useBackup}
            }`
        };

        const res = await util.makeRequest(
            `${this.env}/MFAChallenge.json`,
            this._requestCredentials,
            data
        );

        return res.data;
    }

    /**
     * Multi Factor Authentication (MFA) is used to validate the token sent to the user’s mobile device via the mfaChallenge method.
     * This method validates the challenge ID, token that was sent to the users mobile device, device ID, and the name that was given
     * to the machine at the time of generating the challenge ID. Upon success, the user’s session is marked as a trusted.
     * If the rememberMe parameter is set to true, the trusted session expires in 30 days. Else, it expires when the user logs out.
     *
     * <p> If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/115000169443-MFAAuthenticate" target="_blank">Multi Factor Authentication</a>.
     *
     * @param   {string}  challengeId            the ID that is returned after successfully calling the mfaChallenge method
     * @param   {string}  token                  the token sent to the user's device after calling the mfaChallenge method
     * @param   {string}  deviceId               the ID defined by the user to identify the MFA device
     * @param   {string}  machineName            the name defined by the user to describe the MFA device
     * @param   {boolean} rememberMe             determines if the MFA ID that is returned needs to be trusted after the session is over.
                                                 If set to true, the session expires in 30 days. If set to false, the session expires when the user logs out.
     *
     * @return  {object}                         an object which includes the MFA ID
     *
     * @throws {MissingRequiredFieldException}   this exception is thrown if the challengeId, token, deviceId, machineName, or rememberMe is not defined
     * @throws {FailedRequestException}          this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which multi-factor authenticates the user- requires the challengeId & token acquired via the mfaChallenge endpoint,
    as well as a deviceId and machineName which are arbitrary values chosen by the user, and lastly a rememberMe boolean which
    determines whether or not the mfaId should remain trusted beyond the session */
    async mfaAuthenticate(
        challengeId,
        token,
        deviceId,
        machineName,
        rememberMe
    ) {
        if (!challengeId) {
            throw new MissingRequiredFieldException('challengeId');
        } else if (!token) {
            throw new MissingRequiredFieldException('token');
        } else if (!deviceId) {
            throw new MissingRequiredFieldException('deviceId');
        } else if (!machineName) {
            throw new MissingRequiredFieldException('machineName');
        } else if (rememberMe === undefined) {
            throw new MissingRequiredFieldException('rememberMe');
        }

        const data = {
            data: `{
                    "challengeId": "${challengeId}",
                    "token": "${token}",
                    "deviceId": "${deviceId}",
                    "machineName": "${machineName}",
                    "rememberMe": ${rememberMe}
                }`
        };

        const res = await util.makeRequest(
            `${this.env}/MFAAuthenticate.json`,
            this._requestCredentials,
            data
        );

        return res.data;
    }

    /**
     * Checks the Multi Factor Authentication (MFA) session status of the current user.
     * If the request fails, the FailedRequestException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/115000169463-MFAStatus" target="_blank">MFA Status</a>.
     *
     * @param   {string}  mfaId                 the ID that is returned after successfully calling the mfaAuthenticate method
     * @param   {string}  deviceId              the ID defined by the user to identify the MFA device
     *
     * @return  {object}                        an object which includes the isTrusted boolean field describing if the session trusted or not
     *
     * @throws {MissingRequiredFieldException}  this exception is thrown if the mfaId or deviceId is not defined
     * @throws {FailedRequestException}         this exception is thrown if the request fails - exception includes error message and error code
     */

    // method which fetches the status of an mfaId - true or false depending on whether the mfaid is trusted
    async mfaStatus(mfaId, deviceId) {
        if (!mfaId) {
            throw new MissingRequiredFieldException('mfaId');
        } else if (!deviceId) {
            throw new MissingRequiredFieldException('deviceId');
        }

        const data = {
            data: `{
                    "mfaId":"${mfaId}",
                    "deviceId": "${deviceId}"
                }`
        };

        const res = await util.makeRequest(
            `${this.env}/MFAStatus.json`,
            this._requestCredentials,
            data
        );

        return res.data;
    }
}

module.exports = Auth;
