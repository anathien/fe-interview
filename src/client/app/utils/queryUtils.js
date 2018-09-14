import request from "superagent";

export const getAllBills = async () => {
    try {
        const response = await request.get("http://localhost:3000/bills/");
        console.log("bills from utils: ", response);
        if (response != null) {
            return response.body;
        }
        return [];
    } catch (e) {
        // TODO: Do some proper error handling here
        return [];
    }
};
