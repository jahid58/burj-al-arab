import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { MyContext } from '../../App';
import Bookings from './Bookings';

const Book = () => {
  const [loggedUser,setLoggedUser] = useContext(MyContext)
    const [selectedDate, setSelectedDate] = React.useState({
        checkIn:new Date(),
        checkOut:new Date()
    });
  const handleDateCheckIn = (date) => {
  const  newDate = {...selectedDate}
    newDate.checkIn = date;
    setSelectedDate(newDate)
  };
  const handleDateCheckOut = (date) =>{
     const newDate = {...selectedDate};
      newDate.checkOut = date;
      setSelectedDate(newDate)
  }
  const handleChange=(date)=>{
      setSelectedDate(date)
  }
  const handleBooking=()=>{
    const newBooking = {...loggedUser,...selectedDate}
    fetch('http://localhost:4200/addBooking',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(newBooking)
    })
    .then(res=>res.json())
    .then(result=>console.log(result))
  }
const {bedType} = useParams();
    
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="check in date"
          value={selectedDate.checkIn}
          onChange={handleDateCheckIn}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="check out date"
          format="MM/dd/yyyy"
          value={selectedDate.checkOut}
          onChange={handleDateCheckOut}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate.checkIn}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    <Button onClick={handleBooking}> book now</Button>
    <Bookings event={handleBooking}></Bookings>
        </div>
    );
};

export default Book;