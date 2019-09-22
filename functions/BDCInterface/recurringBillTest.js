module.exports = async function() {
try {
    // instantiate params object for the create bill method (see docs:  https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#billcreate)
    const BDC = await require('./authentication.js')();;

    // creates a Bill and returns a BillEntity Object
    params = {
       "nested": true,
       "start" : 0,
       "max" : 999,
       "filters" : [{"field":"isActive","op":"=","value":"1"}],
       "sort" : []
    }
    data = await BDC.RecurringBill.list(params);
    var list = [];
    for (i=0;i<data.length;i++){
      vendor = await BDC.Vendor.read(data[i].vendorId);
      billDatum = [vendor.name,data[i].amount,data[i].dueDate,data[i].description];
      list.push(billDatum);
      list.push(billDatum);
    }
    console.log(list);

    return list;
} catch (err) {
    console.log(err);
    return null;
    }
};
