const BDC = require('./BDCClientLibrary/lib/BDC');

function BDCExport(username, password, devKey, env) {
    return new BDC(username, password, devKey, env);
}

module.exports = BDCExport;
