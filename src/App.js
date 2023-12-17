
import React from 'react'
import Login from './components/login'
// import Header from './components/header'
import Home from './components/home'
import Experience from './components/experience'
import Hotels from './components/hotels'
// import Footer from './components/footer'
// import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
  // Link,
  // useLocation,
  // Navigate
} from "react-router-dom";
import Hotelinfo from './components/hotelinfo'
import ScrollToTop from './components/scrollToTop'
import Viewexperience from './components/viewexperience'
import Rental from './components/rental'
import PropertyForm from './components/propertyForm'
import Signup from './components/signup'
import Profile from './components/userprofile/profile'
import Account from './components/userprofile/account'
// import Admindashboard from './admindashboard/admindashboard'
import Mainscreen from './components/userprofile/dashboard/mainscreen'
// import Roomdetails from './components/userprofile/dashboard/roomdetails'
// import Dashboardscreen from './components/userprofile/dashboard/dashboardscreen'
// import Roomscreen from './components/userprofile/dashboard/roomscreen'
import Mainscreenadmin from './components/userprofile/admindashboard/mainscreenadmin'
import Checkout from './components/checkout'
import Transaction from './components/transaction'
import Cancelbooking from './components/cancelbooking'
import ForgotPassword from './components/forgotPassword'
import BookingHistory from './components/userprofile/bookingHistory'
import ResetPassword from './components/resetPassword'
import FloatingWhatsAppButton from './components/floatingWhatsAppButton'







export default function App(props) {

  return (

    <Router>
      {/* <Header/>  */}
      
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<Hotels />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/rental' element={<Rental />} />
        <Route path='/hotelinfo/:id' element={<Hotelinfo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='/viewexperience' element={<Viewexperience />}/>
        <Route path='/propertyForm' element={<PropertyForm />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/account' element={<Account />} />
        <Route path='/bookingHistory' element={<BookingHistory/>} />
        <Route path='/mainscreen/*' element={<Mainscreen />} />
        <Route path='/mainscreenadmin/*' element={<Mainscreenadmin />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/bookingcancellation' element={<Cancelbooking/>} />



      </Routes>
      <FloatingWhatsAppButton/>
    
    </Router>
  );
}



