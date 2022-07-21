// imports
import React, { useEffect, useState } from 'react';
import { fetchBills } from '../util/api';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

// Home functional component
export default function Home(props) {

    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [bills, setBills] = useState([]);
    const [currBills, setCurrBills] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    // fetch the list of bills from backend
    useEffect(() => {
        fetchBills().then(bills => {
            setBills(bills);
        }).catch(err => {
            console.log(err);
            toast(`Failed to retrieve your list of bills`, { type: 'error' });
        });
    }, []);


    // reset items to display when page number or number of pages per page changes
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrBills(bills.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(bills.length / itemsPerPage));
    }, [bills, itemOffset, itemsPerPage]);

    // when user clicks on a specific page
    const handlePageChange = (event) => {
        const newOffset = (event.selected * itemsPerPage) % bills.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <div className='bills-container'>
                <h1>Your Electricity Bill History</h1>
                <hr />
                <div className='text-right' style={{textAlign: 'right'}}>
                    <Link className='btn btn-success' to="/addBill">Add New Bill</Link>
                </div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Bill Date</th>
                            <th scope="col">Paid Date</th>
                            <th scope="col">Units Consumed</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currBills.map((bill, idx) =>
                            <tr key={bill._id}>
                                <th scope="row">{itemOffset + idx + 1}</th>
                                <td>{new Date(bill.billDate).toLocaleDateString()}</td>
                                <td>{new Date(bill.paidDate).toLocaleDateString()}</td>
                                <td>{bill.unitsConsumed}</td>
                                <td>{bill.amount}</td>
                                <td><Link className='text-dark' to={`/bill/${bill._id}`}><i className='fa fa-gear'></i></Link></td>
                            </tr>)}
                        {bills.length === 0 &&
                            <tr>
                                <td colSpan={5} className='text-center mt-5'>No bills found</td>
                            </tr>}
                    </tbody>
                </table>
                <div className='d-flex mb-5' style={{justifyContent: 'space-between'}}>
                    <div className='d-inline form-text'>
                        <label htmlFor='numOfItems'>Number of items per page</label>
                    <select className="form-select d-inline" id='numOfItems' value={itemsPerPage}
                        onChange={event => setItemsPerPage(parseInt(event.target.value))}>
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>                        
                    </div>
                    <div className='d-inline form-text'>Displaying {bills.length > 0 ? itemOffset + 1 : 0}-{ Math.min(itemOffset + itemsPerPage, bills.length)} of {bills.length} bill(s)</div>
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    previousLabel="< Previous"
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination justify-content-center"
                    activeClassName="active"

                />
            </div>
        </div>
    );
};
