import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const countDaysInMonth = ({ month, year }) => {
    return 32 - new Date(year, month, 32).getDate();
}

export const GenerateTableHead = () => {
    const dayCells = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        .map(day => <th className="table-dark" key={day}>{day}</th>);

    return (
        <thead>
            <tr>{dayCells}</tr>
        </thead>
    )
};

export const GenerateTableBody = ({ selectedMonth, selectedYear, monthlyData }) => {
    const firstDay = (new Date(selectedYear, selectedMonth)).getDay();
    const daysInMonth = countDaysInMonth({
        month: selectedMonth,
        year: selectedYear
    });
    let table = [];
    let cells = [];
    let row = [];

    for (let i = 1; i < firstDay; i++) {
        cells.push(
            <td key={`empty-${i}`} className="table-active"></td>
        )
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const registeredDay = monthlyData.find(el => {
            const date = new Date(el.date);

            return date.getDate() === day;
        });

        const isDayExpired = new Date(selectedYear, selectedMonth, day + 1) < new Date();

        if (isDayExpired) {
            const cell = (<td key={day} className='table-warning'>
                {day}
            </td>);

            cells.push(cell);
        } else if (typeof registeredDay !== 'undefined') {
            const cell = (<td key={day} className='table-danger'>
                {day}
            </td>);

            cells.push(cell);
        } else {
            const cell = (<td key={day} className='table-success'>
                <Link to={{
                    pathname: "/register",
                    state: {
                        day: day,
                        month: selectedMonth,
                        year: selectedYear
                    }
                }}>
                    <div>{day}</div>
                </Link>
            </td>);

            cells.push(cell);
        }
    }

    while (cells.length % 7) {
        cells.push(
            <td key={`empty-${cells.length}`} className="table-active"></td>
        )
    }

    cells.forEach((cell, index) => {
        row.push(cell);

        if ((index + 1) % 7 === 0) {
            table.push(
                <tr key={index}>{row}</tr>
            );
            row = [];
        }
    })

    return (
        <tbody>{table}</tbody>
    );
};

countDaysInMonth.propTypes = {
    subscribedStock: PropTypes.number.isRequired,
    authorized: PropTypes.number.isRequired,
}

GenerateTableBody.propTypes = {
    selectedMonth: PropTypes.number.isRequired,
    selectedYear: PropTypes.number.isRequired,
    monthlyData: PropTypes.array.isRequired
}