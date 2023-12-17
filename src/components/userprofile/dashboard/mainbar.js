import React from 'react'
import Roomscreen from './roomscreen'
import Dashboardscreen from './dashboardscreen'
import Roomdetails from './roomdetails'
import { Route, Routes } from 'react-router-dom'
import Bookings from './bookings'
import Schedules from './schedules'


export default function Mainbar() {
    return (
        <div style={{ marginRight: "20px" }}>
            <Routes>
                
                <Route path="/room/*" element={<Roomscreen />} /> 
                <Route path="room/:roomId" element={<Roomdetails />} /> 
                <Route path="dashboard/*" element={<Dashboardscreen />} />
                <Route path="bookings/*" element={<Bookings />} />
                <Route path="schedules/*" element={<Schedules/>} />
            </Routes>
        </div>
    )
}
