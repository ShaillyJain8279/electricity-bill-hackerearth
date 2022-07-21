import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import BillForm from './components/BillForm';
import Bill from './components/Bill';
import EditBill from './components/EditBill';

function App() {
  return (
    <div className='container mt-5'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addBill" element={<div><BillForm bill={{}}/></div>} />
          <Route path="/bill/:id" element={<Bill />} />
          <Route path="/edit/:id" element={<EditBill />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      <div className='text-center mt-5' style={{position: 'absolute', bottom: 10, width: '100%'}}>
        Made with <i className='fa fa-heart text-danger'></i> by Shailly Jain (shaillyjain1512@gmail.com)
      </div>
    </div>
  )
}

export default App;
