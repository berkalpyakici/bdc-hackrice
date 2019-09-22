(async()=>{try{
const response = await require('./BDCInterface/getInvoices.js')();
console.log(response);
}catch(err){console.log(err);};
})();
