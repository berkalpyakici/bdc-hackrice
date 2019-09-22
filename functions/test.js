(async()=>{try{
const response = await require('./BDCInterface/recurringBillTest.js');
console.log(response);
}catch(err){console.log(err);};
})();
