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

        const rdata = await BDC.RecurringBill.list(params);
        const data = await BDC.Bill.list(params);
        for(var i=0;i<rdata.length;i++){
          console.log(rdata[i]);
            for(var j=0; j<rdata[i].recurringBillLineItems.length;j++){
              datum = {"amount":rdata[i].recurringBillLineItems[j].amount,
                       "vendorId":rdata[i].vendorId,
                       "dueDate":rdata[i].nextDueDate,
                       "description":rdata[i].recurringBillLineItems[j].description
                     };
              console.log(datum);
              data.push(datum);
            }


        }
        var list = [];

        for (var i=0; i < data.length; i++) {
            const vendor = await BDC.Vendor.read(data[i].vendorId);
            list.push([vendor.name,data[i].amount,data[i].dueDate,data[i].description]);
        }

        return list;
    } catch (err) {
        console.log(err);
        return null;
    }
};
