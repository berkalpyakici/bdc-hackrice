(async () => {
    const toExport = await require('./getVendorIndex.js')();
    exports.vendorStatus = toExport.getVendors;
})();
