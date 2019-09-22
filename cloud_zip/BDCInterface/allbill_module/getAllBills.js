module.exports = async function() {
    try {
        const BDC = await require('../auth_module/authentication.js')();



        const response = await BDC.Bill.list({"sort": [{"field": "updatedTime", "asc": 1}]});
        
        const columns = ["ID", "Amount", "Due Date"];
        var rows = [];

        for (let i = 0; i < response.length; i++) {
            rows.push([response[i].id, response[i].amount, response[i].dueDate]);
        }

        return [strings[inputStatus], columns, rows];

    } catch (err) {
        console.log(err);
        return null;
    }
}
