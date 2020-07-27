import React, { useState, useEffect } from 'react';

import {
    monthNames,
    GenerateTableHead, GenerateTableBody
} from './tableUtils';

export default function Table() {
    const today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/registration/')
            .then(res => res.json())
            .then(registrations => {
                const filteredRegistrations = registrations.filter(el => {
                    const date = new Date(el.date);

                    return date.getMonth() === selectedMonth;
                });

                setMonthlyData(filteredRegistrations);
            })
            .catch(error => console.log(error));
    }, [selectedMonth, selectedYear]);

    const handlePreviousMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    }

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button
                        className="btn text-info"
                        onClick={handlePreviousMonth}
                    >
                        &larr; Previous
                    </button>
                    <span className="display-4">
                        {monthNames[selectedMonth]} {selectedYear}
                    </span>
                    <button
                        className="btn text-info"
                        onClick={handleNextMonth}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
            <table className="table mt-2">
                <GenerateTableHead />

                <GenerateTableBody
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    monthlyData={monthlyData}
                />
            </table>
        </div>
    )
}
