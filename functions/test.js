(async()=>{try{
const response = await require('./BDCInterface/getRecurringBills.js')();
console.log(response);
}catch(err){console.log(err);};
})();
