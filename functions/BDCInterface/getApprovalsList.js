/* Takes in the number for approval status and returns all bills under that status.
         6: all bills (sorted by approval status)
         0: unassigned
         1: assigned
         4: approving
         3: approved
         5: denied
*/
module.exports = async function(inputStatus) {
    try {
        const BDC = await require('./authentication.js')();

        const statuses = {
            "all": 6,
            "unassigned": 0,
            "assigned": 1,
            "approving": 4,
            "approved": 3,
            "denied": 5
        }

        const statuses_response = {6: "All", 0: "Unassigned", 1: "Assigned", 4: "Approving", 3: "Approved", 5: "Denied"};

        if(inputStatus == 'all') {
            var response = await BDC.Bill.list({"sort": [{"field": "updatedTime", "asc": 0}]});
        } else {
            var response = await BDC.Bill.list({"approvalStatus": statuses[inputStatus], "sort": [{"field": "dueDate", "asc": 0}]});
        }

        const strings = {'all': "Here are all your bills sorted by approval.", 'unassigned': "Here are all your unassigned bills.", 'assigned': "Here are all your assigned bills.",
                    'approving': "Here are all your bills that are being approved.", 'approved': "Here are all your approved bills.", 'denied': "Here are all your denied bills."};
        const columns = ["ID", "Amount", "Due Date", "Status"];
        var rows = [];

        for (let i = 0; i < response.length; i++) {
            rows.push([response[i].id, response[i].amount, response[i].dueDate, statuses_response[response[i].approvalStatus]]);
        }

        return [strings[inputStatus], columns, rows];


    } catch (err) {
        console.log(err);
        return null;
    }
}
