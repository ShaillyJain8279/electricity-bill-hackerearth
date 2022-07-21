// imports
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteBill, fetchBillById } from '../util/api';

// functional component for bill
export default function Bill(props) {

    const [bill, setBill] = useState(null);
    const [redirect, setRedirect] = useState(null);
    let params = useParams();
    useEffect(() => {
        // fetch the bill by id
        fetchBillById(params.id).then(bill => {
            setBill(bill);
        }).catch(err => {
            console.log(err);
            toast(`Failed to find bill with id ${params.id}`, {type: 'error'});
        });
    }, [params.id]);


    // method invoked when bill is deleted
    const handleOnDeleteBill = () => {
        let confirmDelete = window.confirm(`Are you sure you want to delete this bill?`);
        if (!confirmDelete) return;
        deleteBill(params.id).then(() => {
            setRedirect(<Navigate to="/" />);
            toast(`Bill deleted successfully`);
        }).catch(err => {
            console.log(err);
            toast(err, {type: 'err'});
        });
    };

    if (redirect)   return redirect;
    return (
        <div>
            <h1 className='mb-5'><Link className='text-dark' style={{textDecoration: 'none'}} to="/"> <i className='fa fa-arrow-left'></i> Back</Link> </h1>
            {!bill && <p>Retriving bill details...</p>}
            {bill && 
            <div>
                <h1>Your Bill Details</h1>
                <hr/>
                <div>
                    <strong>Transaction Id: </strong>{bill._id}<br/>
                    <strong>Bill Date: </strong>{new Date(bill.billDate).toDateString()}<br/>
                    <strong>Paid Date: </strong>{new Date(bill.paidDate).toDateString()}<br/>
                    <strong>Units Consumed: </strong>{bill.unitsConsumed}<br/>
                    <strong>Amount: </strong>{bill.amount}<br/>
                    <hr/>
                    <Link className='btn btn-success' style={{marginRight: '10px'}} to={`/edit/${bill._id}`}>Edit</Link>
                    <button className='btn btn-danger' onClick={handleOnDeleteBill}>Delete</button>
                </div>
            </div>}
        </div>
    );
};