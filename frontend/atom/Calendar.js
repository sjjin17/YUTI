import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar({ startDate, setStartDate }) {
  return (
    <>
      {startDate && (
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
        ></DatePicker>
      )}
    </>
  );
}
