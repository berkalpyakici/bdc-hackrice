module.exports = async function(type) {
    try {
        // instantiate params object for the create bill method (see docs:  https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#billcreate)
        const BDC = await require('./authentication.js')();;

        // creates a Bill and returns a BillEntity Object
        var params = {
            "nested": true,
            "start" : 0,
            "max" : 999,
            "filters" : [{"field":"paymentStatus","op":"=","value":"1"}],
            "sort" : []
        }

        if(type == null){
            var invoices = await BDC.Invoice.list();
        }
        else if (type=="Open") {
            params.filters[0].value = "1";
            var invoices = await BDC.Invoice.list(params);
        }else if (type=="Partial Payment") {
            params.filters[0].value = "2";
            var invoices = await BDC.Invoice.list(params);
        }else if (type=="Paid In Full") {
            params.filters[0].value = "0";
            var invoices = await BDC.Invoice.list(params);
        }else if (type=="Scheduled") {
            params.filters[0].value = "4";
            var invoices = await BDC.Invoice.list(params);
        }

        payment_to_string = {
          1:"Open",
          2:"PartialPayment",
          0:"PaidInFull",
          4:"Scheduled"
        }
        rows = []
        for(i=0;i<invoices.length;i++){
            //What is it? Who is it made to, how much do you owe, what is the status?
            var current = invoices[i];
            //console.log(invoices);
            var customer = await BDC.Customer.read(current.customerId);
            var datum = [customer.name,payment_to_string[current.paymentStatus],current.amountDue];
            rows.push(datum);
        }
        return rows;
    } catch (err) {
        console.log(err);
        return null;
    }
};
