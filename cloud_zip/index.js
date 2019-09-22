exports.vendorStatus = async data => {
    var toExport = await require('vendor');
    return toExport.getVendors;
};

exports.vendorStatus();


