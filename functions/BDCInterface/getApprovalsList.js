/* Takes in the number for approval status and returns all bills under that status.
         6: all bills (sorted by approval status)
         0: unassigned
         1: assigned
         4: approving
         3: approved
         5: denied
*/
module.exports = function(inputStatus) {
    try {
        const BDC = await require('./authentication.js')();

        const statuses = {6: "All Bills", 0: "unassigned", 1: "assigned", 4: "approving", 3: "approved", 5: "denied"};

        if(inputStatus == 6) {
            const response = await BDC.Bill.list({"sort": [{"field": "updatedTime", "asc": 0}]});
        } else {
            const response = await BDC.Bill.list({"approvalStatus": inputStatus, "sort": [{"field": "dueDate", "asc": 0}]});
        }

        const strings = {6: "Here are all your bills sorted by approval:", 0: "Here are all your unassigned bills:", 1: "Here are all your assigned bills", 
                    4: "Here are all your bills that are being approved", 3: "Here are all your approved bills", 5: "Here are all your denied bills"};
        const columns = ["ID", "Amount", "Due Date", "Assigned"];
        var rows = [];

        for (let i = 0; i < response.length; i++) {
            rows.push([response[i].id, response[i].amount, response[i].dueDate, statuses[response[i].approvalStatus]]);
        }

        return [strings[inputStatus], columns, rows];


    } catch (err) {
        console.log(err);
        return null;
    }
}