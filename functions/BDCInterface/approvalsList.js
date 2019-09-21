
(async () => {
    try{
        const BDC = await require('./authentication.js')();;

        var data = await BDC.Bill.list({"sort": [{"field": "updatedTime", "asc": 0}]});
        console.log(data);
        for (i = 0; i < data.length; i++) {
            console.log(data[0].isActive);
        }
        
        console.log("Hey I'm here...");
    }
    catch (err) {
        console.log(err);
    }
    console.log("WHAAAT");
})
//();

/* Takes in the number for approval status and returns all bills under that status.
         6: all bills (sorted by approval status)
         0: unassigned
         1: assigned
         4: approving
         3: approved
         5: denied
*/
function returnApprovals(inputStatus){
    try{
    const BDC = await require('./authentication.js')();;
    }
    catch (err) {
        console.log(err);
        return ["Couldn't log you in, sorry!", [], [[]]];
    }
    var statuses = {6: "All Bills", 0: "unassigned", 1: "assigned", 4: "approving", 3: "approved", 5: "denied"};
    if(inputStatus == 6) {
        var data = await BDC.Bill.list({"sort": [{"field": "updatedTime", "asc": 0}]});
    } else {
        var data = await BDC.Bill.list({"approvalStatus": inputStatus, "sort": [{"field": "dueDate", "asc": 0}]});
    }
    var returnHeaders = ["ID", "Amount", "Due Date", "Assigned"];
    var returnValues = [];
    for (let i = 0; i < data.length; i++) {
        returnValues.push([bob[i].id, bob[i].amount, bob[i].dueDate, statuses[bob[0].approvalStatus]]);
    }
    var strings = {6: "Here are all your bills sorted by approval:", 0: "Here are all your unassigned bills:", 1: "Here are all your assigned bills", 
                    4: "Here are all your bills that are being approved", 3: "Here are all your approved bills", 5: "Here are all your denied bills"};
    return [strings[inputStatus], returnHeaders, returnValues];
}

module.exports = returnApprovals;
