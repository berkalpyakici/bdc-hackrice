var exports = module.exports = {};

async function getVendors(){
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

async function vendorStatus(){
    const BDC = await require('./authentication.js')();
    const endpoint = '/GetNetworkStatus.json';
    var vendors = await getVendors();
    var original = "This is the update from all your vendors.";
    var number_to_status = {0: "not connected", 1: "pending connection", 2:"connected"};
    for(var vendor in vendors){
        var id = vendors[vendor].id;
        let netStat = await BDC.makeRequest(endpoint, JSON.stringify({"id": id}));

    }

}

exports.vendorStatus = vendorStatus();
exports.getVendors = getVendors();

(async () => {
    try{
        let a = await vendorStatus();
        console.log("this is the past");
    }
    catch (err) {
        console.log(err);

    }
})();
