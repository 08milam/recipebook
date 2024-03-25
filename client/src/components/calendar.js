import React, { useState } from 'react';

const Calendar = ({ setShowCalendar }) => {
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(null); // State to hold error

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const getCurrentMonthDays = () => {
    const currentMonth = date.getMonth();
    try {
      const days = new Date(date.getFullYear(), currentMonth + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    } catch (error) {
      setError(error); // Log error to state
      console.error('Error:', error); // Log error to console
      return [];
    }
  };

  const getFirstDayOfWeek = () => {
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return (firstDayIndex === 0) ? 7 : firstDayIndex; // Adjusting Sunday to index 7
  };

  const getLastDayOfMonth = () => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const isCurrentDay = (day) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false); // Call setShowCalendar to hide the calendar
  };



  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete-me/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // Success message or perform any other actions upon successful deletion
        console.log('User deleted successfully');
      } else {
        // Handle error response
        const errorMessage = await response.text();
        console.error('Error deleting user:', errorMessage);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };




  
  return (
    <div className='cc-container'>
      <div className="calendar-container">
        <button className="close-button" onClick={handleCloseCalendar}>x</button> {/* Close calendar when x button is clicked */}
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <div className="month">{monthsOfYear[date.getMonth()]} {date.getFullYear()}</div>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="calendar-days">
          {daysOfWeek.map((day, index) => (
            <div className="day-label" key={day}>{day}</div>
          ))}
          {Array.from({ length: getFirstDayOfWeek() - 1 }, (_, i) => (
            <div className="day empty" key={`empty-${i}`} />
          ))}
          {getCurrentMonthDays().map(day => (
            <div className={`day ${isCurrentDay(day) ? 'current-day' : ''}`} key={day}>{day}</div>
          ))}
          {Array.from({ length: 7 - (getLastDayOfMonth() + getFirstDayOfWeek() - 1) % 7 }, (_, i) => (
            <div className="day empty" key={`empty-end-${i}`} />
          ))}
        </div>
        {/* <h2>Do you wish to delete your account?</h2>
        <button className='delete-me' onClick={() => handleDeleteUser('matt@test.com')}>

</button> */}

      </div>
      {error && <div>Error: {error.message}</div>} {/* Render error message if an error occurs */}
    </div>
  );
};

export default Calendar;
