module.exports = async function() {
    try {
        // instantiate params object for the create bill method (see docs:  https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#billcreate)
        const BDC = await require('./authentication.js')();;

        // creates a Bill and returns a BillEntity Object
        const params = {
            "nested": true,
            "start" : 0,
            "max" : 999,
            "filters" : [{"field":"isActive","op":"=","value":"1"}],
            "sort" : []
        }

        const data = await BDC.RecurringBill.list(params);

        var list = [];

        for (var i=0; i < data.length; i++) {
            const vendor = await BDC.Vendor.read(data[i].vendorId);

            for(var j=0; j < data.length; j++){
              list.push([vendor.name ? vendor.name : 'N/A', data[i].recurringBillLineItems[j].amount ? data[i].recurringBillLineItems[j].amount : 'N/A', data[i].nextDueDate ? data[i].nextDueDate : 'N/A', data[i].description ? data[i].description : 'N/A']);
            }
        }

        return list;
    } catch (err) {
        console.log(err);
        return null;
    }
};
