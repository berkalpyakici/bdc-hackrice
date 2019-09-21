(async () => {
try {
    // instantiate params object for the create bill method (see docs:  https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#billcreate)
    const BDC = await require('./BDCInterface/authentication.js')();;

    // creates a Bill and returns a BillEntity Object
    params = {
   "nested": true,
   "start" : 0,
   "max" : 999,
   "filters" : [{"field":"isActive","op":"=","value":"1"}],
   "sort" : []
}
    data = await BDC.Bill.list(params);
    list = [{"name":"HI"}]
    for (i=0;i<data.length;i++){
      vendor = await BDC.Vendor.read(data[i].vendorId);
      billDatum = {"amount":data[i].amount,"dueDate":data[i].dueDate,"description":data[i].description,"vendor":vendor.name};
      list += billDatum;
    }
    
  module.exports = list;
} catch (err) {
    console.log(err);

    }
})();
