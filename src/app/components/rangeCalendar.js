import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import {Helmet} from "react-helmet";

import 'react-day-picker/lib/style.css';

const specialDays = {
  3: ['ICR', 'IDP'],
  8: ['Health Conference'],
  9: ['Morgan Stanley'],
  12: ['ICI'],
  18: ['Lockheed'],
  22: ['Goldman', 'ICR'],
  25: ['Competitor'],
  26: ['IDA'],
};

function renderDay(day) {
    const date = day.getDate();
    const dateStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 12,
   
  };
  const specialDaysStyle = { fontSize: '0.8em', textAlign: 'left' };
  const cellStyle = {
    height: 50,
    width: 100,
   
    position: 'relative',
    borderRadius: '5px',
  };
  return (
    <div style={cellStyle}>
      <div style={dateStyle}>{date}</div>
      {specialDays[date] &&
        specialDays[date].map((name, i) => (
          <div key={i} style={specialDaysStyle}>
            📠 {name}
          </div>
        ))}
    </div>
  );
}
 


export default class CalendarPull extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
      
    }

 
  
 
    isSelectingFirstDay(from, to, day) {
      const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
      const isRangeSelected = from && to;
      return !from || isBeforeFirstDay || isRangeSelected;
    }
  
    handleDayClick(day) {
      const from = this.props.currentState.from;
      const to = this.props.currentState.to;

      if (from && to && day >= from && day <= to) {
        this.handleResetClick();
        return;
      }
      if (this.isSelectingFirstDay(from, to, day)) {
        this.props.updateState('first',{
          from: day,
          to: null,
          enteredTo: null,
        });
      } else {
        this.props.updateState('second',{
          to: day,
          enteredTo: day,
        });
      }
    }
  
    handleDayMouseEnter(day) {
      console.log(this.props.currentState);

      const from = this.props.currentState.from;
      const to = this.props.currentState.to;
        if (!this.isSelectingFirstDay(from, to, day)) {
        this.props.updateState('third',{
          enteredTo: day,
        });
      }
    }
  
    handleResetClick() {
      this.props.updateState('first',{
        from: null,
        to: null,
        enteredTo: null,
      });
    }

     
 
    render() {

      const from = this.props.currentState.from;
      const to = this.props.currentState.to;
      const enteredTo = this.props.currentState.enteredTo;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = [{daysOfWeek: [0, 6]},{ before: this.props.currentState.from }];
    const selectedDays = [from, { from, to: enteredTo }];

        return (
            <div className="calendarContainer">
            {this.props.abc}
          <DayPicker

             canChangeMonth={true}
             className="Range specialDays"
            renderDay={renderDay}
            fromMonth={from}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
 
          />
          <div className="calendarSelection_container"> 
           {!from && !to && <button className="calendarSelection" disabled={true}>Please select the first day</button>}
          {from && !to && <button className="calendarSelection" disabled={true}>Please select the last day.</button>}
          {from &&
            to &&
            <button onClick={this.props.closeCalendar} className="calendarSelection">Select Range {from.toLocaleDateString()}{' '}to{' '}
                {to.toLocaleDateString()}</button>}{' '}
          {from && to && (
            <button className="link calendarReset" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
          </div>
           <Helmet>
          <style>{`
  .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside):not(.DayPicker-Day--disabled) {
    background-color: #82bafb !important;
    color: #4a90e2;
  }
  .Range .DayPicker-Day {
    border-radius: 0 !important;
  }
`}</style>
        </Helmet>
        
              </div>
        );
    }
}