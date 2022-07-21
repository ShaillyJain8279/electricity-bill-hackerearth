import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BillForm from './BillForm';
import { fetchBillById } from '../util/api';

export default function EditBill(props) {
    let params = useParams();
    const [bill, setBill] = useState(null);
    useEffect(() => {
        // fetch the bill by id
        fetchBillById(params.id).then(bill => {
            console.log(bill);
            setBill(bill);
        }).catch(err => {
            console.log(err);
            toast(`Failed to find bill with id ${params.id}`, {type: 'error'});
        });
    }, [params.id]);

    return (
        <div>
            {!bill && 'Retrieving bill details...'}
            {bill && <BillForm {...bill} />}
        </div>
    );
};