(async()=>{
  const response = await require('./BDCInterface/getRecurringBills.js')();
  console.log(response);
})();
