import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../App';

const Bookings = (props) => {
    const [loggedUser,setLoggedUser] = useContext(MyContext)
    const [bookings,setBookings] = useState([])
    useEffect(()=>{
        fetch('http://localhost:4200/bookings?email='+loggedUser.email,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setBookings(result)
            console.log(result)
        })
    },[])
    return (
        <div>
           {
           bookings.length &&
           <div className="bok">
                <h3>You have booked {bookings.length} room</h3>
                {bookings.map(rm=><h2>{rm.email} check in : {rm.checkIn}</h2>)}
           </div>
          
         
           }
        </div>
    );
};

export default Bookings;