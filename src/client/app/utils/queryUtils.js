import request from "superagent";

export const getAllBills = async () => {
    try {
        const response = await request.get("http://localhost:3000/bills/");
        if (response != null) {
            return response.body;
        }
        return [];
    } catch (e) {
        // TODO: Do some proper error handling here
        console.error("The following error occured while getting all bills: ", e);
        return [];
    }
};

export const changeBillFlag = async bill => {
    try {
        const changedBill = Object.assign({}, bill);
        changedBill.isBill = !changedBill.isBill;
        await request.patch(`http://localhost:3000/bills/${bill.id}`).send(changedBill);
        const newBills = await getAllBills();
        return newBills;
    } catch (e) {
        // TODO: Do some proper error handling here
        console.error("The following error occured while changing bill flag: ", e);
        return [];
    }
};
