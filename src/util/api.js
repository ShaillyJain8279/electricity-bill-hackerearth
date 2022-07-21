// imports
import axios from 'axios';
// axios.defaults.baseURL = `http://localhost:8080/bills`;
axios.defaults.baseURL = `https://electricity-bill-server.herokuapp.com/bills`;

// fetches the list of bills from backend
const fetchBills = () => new Promise((resolve, reject) => {
    axios.get('/').then(resp => {
        if (resp.status === 200)    resolve(resp.data.bills);
        else            reject(resp.error);
    }).catch(resp => {
        if (resp.response && resp.response.data && resp.response.data.error)    reject(resp.response.data.error);
        else                                 reject(resp);
    });
});

// fetch the bill by id
const fetchBillById = (id) => new Promise((resolve, reject) => {
    axios.get(`/${id}`).then(resp => {
        if (resp.status === 200)    resolve(resp.data.bill);
        else                        reject(resp.error);
    }).catch(resp => {
        if (resp.response && resp.response.data && resp.response.data.error)    reject(resp.response.data.error);
        else                                 reject(resp);
    });
});

// updates the bill
const updateBill = ({id, billDate, paidDate, unitsConsumed, amount}) => new Promise((resolve, reject) => {
    axios.post(`/${id}`, {billDate, paidDate, unitsConsumed, amount}).then(resp => {
        resolve(resp.data.id);
    }).catch(resp => {
        if (resp.response && resp.response.data && resp.response.data.error)    reject(resp.response.data.error);
        else                                 reject(resp);
    });
});

// saves the bill
const saveBill = ({billDate, paidDate, unitsConsumed, amount}) => new Promise((resolve, reject) => {
    axios.put('/', {billDate, paidDate, unitsConsumed, amount}).then(resp => {
        resolve(resp.data.id);
    }).catch(resp => {
        if (resp.response && resp.response.data && resp.response.data.error)    reject(resp.response.data.error);
        else                                 reject(resp);
    });
});

// deletes a bill by id
const deleteBill = (id) => new Promise((resolve, reject) => {
    axios.delete(`/${id}`).then(resp => {
        resolve();
    }).catch(resp => {
        if (resp.response && resp.response.data && resp.response.data.error)    reject(resp.response.data.error);
        else                                 reject(resp);
    });
});


// export the items
export {
    fetchBills,
    fetchBillById,
    saveBill,
    updateBill,
    deleteBill
};
