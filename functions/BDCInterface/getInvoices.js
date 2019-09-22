module.exports = async function() {
    try {
        // instantiate params object for the create bill method (see docs:  https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#billcreate)
        const BDC = await require('./authentication.js')();;

        // creates a Bill and returns a BillEntity Object
        var invoices = await BDC.Invoice.list();
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
            console.log(customer);
            var datum = [customer.name,payment_to_string[current.paymentStatus],current.amountDue];
            rows.push(datum);
        }
        console.log(datum);
        return rows;
    } catch (err) {
        console.log(err);
        return null;
    }
};
