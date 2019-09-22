var exports = module.exports = {};
var number_to_status = {0: "not connected", 1: "pending connection", 2:"connected"};
String.prototype.format = function () {
    var i = 0, args = arguments[0];
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

async function getVendors() {
    const BDC = await require('./authentication.js')();
    const endpoint = '/List/Vendor.json';
    const data=`{
            "nested": true,
            "start" : 0,
            "max" : 999,
            "filters" : [],
            "sort" : []
        }`;
    let vendors = await BDC.makeRequest(endpoint, data);
    console.log(vendors);
    return vendors;
}

async function vendorStatus() {
    const BDC = await require('./authentication.js')();
    const endpoint = '/GetNetworkStatus.json';

    var vendors = await getVendors();
    var original = "This is the update from all your vendors. ";

    var columns = ["Name", "Company", "Status"];
    var rows = [];
    for(var vendor in vendors){
        var the_vendor = vendors[vendor];
        let netStat = await BDC.makeRequest(endpoint, JSON.stringify({"id": the_vendor.id}));
        var row = [the_vendor.name, the_vendor.companyName, number_to_status[netStat.status]];
        original += "{} from the company {} is {} to your network.".format(row);
        console.log(original);
        rows.push(row);
    }
    return [original, columns, rows];
}

async function vendorAdded() {

}

// (async () => {
//     try{
//         let a = await vendorStatus();
//         console.log("this is the past");
//     }
//     catch (err) {
//         console.log(err);

//     }
// })();

exports.vendorStatus = vendorStatus;
exports.getVendors = getVendors;
