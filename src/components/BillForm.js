// imports
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { saveBill, updateBill } from '../util/api';
import { Link, Navigate } from 'react-router-dom';


// parses a date
const parseDate = (date) => {
    if (!date)  return '';
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return `${year}-${month < 10 ? '0': ''}${month}-${day < 10 ? '0': ''}${day}`
}


// functional component
export default function BillForm(props) {
    let title = props._id ? "Edit Bill" : "Add Bill";
    let btnTxt = props._id ? "Update Bill" : "Add Bill";

    // states
    const [billDate, setBillDate] = useState(parseDate(props.billDate));
    const [paidDate, setPaidDate] = useState(parseDate(props.paidDate));
    const [unitsConsumed, setUnitsConsumed] = useState(props.unitsConsumed || 0);
    const [amount, setAmount] = useState(props.amount || 0);
    const [billDateTouched, setBillDateTouched] = useState(false);
    const [paidDateTouched, setPaidDateTouched] = useState(false);
    const [unitsConsumedTouched, setUnitsConsumedTouched] = useState(false);
    const [amountTouched, setAmountTouched] = useState(false);
    const [redirect, setRedirect] = useState(null);

    // resets all the fields
    const resetForm = () => {
        setBillDate(''); setBillDateTouched(false);
        setPaidDate(''); setPaidDateTouched(false);
        setUnitsConsumed(0); setUnitsConsumedTouched(false);
        setAmount(0); setAmountTouched(false);
    };

    // handles the form submission event
    const handleOnSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!billDate || !paidDate || !unitsConsumed || !amount) {
            toast('Please provide all the details', {
                type: 'error'
            });
            return;
        }      
        
        // take decision based on id
        let funToCall = props._id ? updateBill : saveBill;
        funToCall({id: props._id, billDate, paidDate, unitsConsumed, amount}).then((id) => {
            setRedirect(<Navigate to={`/bill/${id}`} />)
            toast('Bill saved successfully', {type: 'success'});
            resetForm();
        }).catch(err => {
            console.log(err);
            toast(err, {type: 'error'});
        });
    };

    if (redirect)   return redirect;
    return (
        <div>
            <h1><Link className='text-dark' style={{textDecoration: 'none'}} to="/"> <i className='fa fa-arrow-left'></i> Back</Link> </h1>
            <form className='border p-5 mt-5' method='post' action='/' onSubmit={handleOnSubmit}>
                <h1>{title}</h1>
                <hr />
                <input type="hidden" value={props._id} id="id" />
                <div className='row'>
                    <div className="col mb-3">
                        <label htmlFor="billDate" className="form-label">Bill Date</label>
                        <input type="date" className={`form-control ${billDateTouched && !billDate && "border-danger"}`} id="billDate" aria-describedby="billDateHelp"
                            value={billDate} onChange={event => {
                                setBillDate(event.target.value);
                                setBillDateTouched(true);
                            }}/>
                        <div id="billDateHelp" className="form-text">This is the date on which you were billed.</div>
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="paidDate" className="form-label">Paid Date</label>
                        <input type="date" className={`form-control ${paidDateTouched && !paidDate && "border-danger"}`} id="paidDate" aria-describedby="paidDateHelp"
                        value={paidDate} onChange={event => {
                            setPaidDate(event.target.value);
                            setPaidDateTouched(true);
                        }}/>
                        <div id="paidDateHelp" className="form-text">This is the date on which you paid the bill.</div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col mb-3">
                        <label htmlFor="unitsConsumed" className="form-label">Units Consumed</label>
                        <input type="number" min={0} step={0.01} className={`form-control ${unitsConsumedTouched && !unitsConsumed && 'border-danger'}`} id="unitsConsumed" aria-describedby="unitsConsumedHelp"
                        value={unitsConsumed} onChange={event => {
                            setUnitsConsumed(event.target.value);
                            setUnitsConsumedTouched(true);
                        }}/>
                        <div id="unitsConsumedHelp" className="form-text">This is the number of units that you have consumed.</div>
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" min={0} step={0.01} className={`form-control ${amountTouched && !amount && 'border-danger'}`} id="amount" aria-describedby="amountHelp"
                        value={amount} onChange={event => {
                            setAmount(event.target.value);
                            setAmountTouched(true);
                        }}/>
                        <div id="amountHelp" className="form-text">This is the amount you have paid.</div>
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100 mb-3">{btnTxt}</button>
                <button type="button" className="btn btn-primary w-100" onClick={resetForm}>Reset</button>
            </form>
        </div>
    )
};