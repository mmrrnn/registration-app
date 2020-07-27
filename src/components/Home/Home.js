import React, { useState, useEffect } from 'react';

const findCurrentRegistration = ({ registrations, today }) => {
    return registrations.find(el => {
        const date = new Date(el.date);
        const condition = date.getDate() === today.getDate()
            && date.getMonth() === today.getMonth()
            && date.getFullYear() === today.getFullYear();

        return condition;
    });
}

export default function Home() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const today = new Date();

    useEffect(() => {
        fetch('http://localhost:5000/registration/')
            .then(res => res.json())
            .then(registrations => {
                const foundRegistration = findCurrentRegistration({
                    registrations, today
                });

                if (typeof foundRegistration !== 'undefined') {
                    setName(foundRegistration.name);
                    setMessage(foundRegistration.message);
                }
            })
            .catch(error => console.log(error));
    }, [today]);

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">{name}</h1>
                <hr className="my-4" />
                <p className="lead">{message}</p>
            </div>
        </div>
    )
}