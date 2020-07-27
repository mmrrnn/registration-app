import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { monthNames } from '../Table/tableUtils';

export default function Register(props) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const { day, month, year } = props.location.state;
    const dateInput = `${day} ${monthNames[month]} ${year}`;

    const handleSubmit = e => {
        e.preventDefault();
        const date = new Date(year, month, day);

        fetch(
            `http://localhost:5000/registration/add`,
            {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ name, message, date })
            }
        )
            .then(() => {
                console.log("Added new registration!");
                history.goBack();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 mx-auto">
                    <h3 className="text-primary text-center">
                        Create Message for {dateInput}
                    </h3>
                    <form className="mt-3" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                required
                                onChange={e => setMessage(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
