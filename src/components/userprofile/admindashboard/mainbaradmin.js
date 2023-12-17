import React from 'react'
import Roomscreen from './roomscreen'
import Dashboardscreen from './overviewadmin'

import { Route, Routes } from 'react-router-dom'
import Overviewadmin from './overviewadmin'
import Bookings from './bookings'
import Employees from './employees'
import Addnewemployee from './addnewemployee'
import Others from './others'


export default function Mainbaradmin() {
    return (
        <div style={{ marginRight: "20px", paddingTop: "30px" }}>
            <Routes>

                <Route path="/room/*" element={<Roomscreen />} />

                <Route path="overviewadmin/*" element={<Overviewadmin />} />
                <Route path="booking/*" element={<Bookings />} />
                { localStorage.getItem('isEmployee') == 'false' &&
                <><Route path="employees/*" element={<Employees />} />
                <Route path="employees/:empId" element={<Addnewemployee />} /></>
                  
                }
                  <Route path="others/*" element={<Others/>} />
            </Routes>
        </div>
    )
}
