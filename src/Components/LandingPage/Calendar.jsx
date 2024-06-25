import React, { useState, useEffect } from 'react';
import data from './date.json';

const Calendar = ({ monthData, onDateClick }) => {
  const daysInMonth = 30; // Adjust this as per the specific month
  const weeks = [];
  let days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const dateData = monthData.find(item => item.No === i.toString());
    days.push(
      <div
        key={i}
        className="border border-gray-300 p-2 cursor-pointer"
        onClick={() => onDateClick(i)}
      >
        <div className="text-center">{i}</div>
        {dateData && (
          <div className="text-sm text-green-500">
            {dateData.todolist ? 'To-Do' : ''}
          </div>
        )}
      </div>
    );

    if (days.length === 7 || i === daysInMonth) {
      weeks.push(<div key={i} className="grid grid-cols-7 gap-2">{days}</div>);
      days = [];
    }
  }

  return (
    <div>
      {weeks}
    </div>
  );
};

export default Calendar;