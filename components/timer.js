import React, { useState, useEffect } from 'react'

export default function Timer({ deadline }) {
    // deadline = '2022-10-20 15:45:00';
    let _days = '';
    let _hours = '';
    let _mins = '';
    let _secs = '';
    let d = '';
    let h = '';
    let m = '';
    let s = '';
    let diff = null;
    let now = null;
    let future = null;
    const [days, setDays] = React.useState(0);

    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const getTime = () => {
        future = new Date(deadline).getTime();
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York'
        });
        now = new Date(nDate).getTime();
        diff = future - now;
        var d1 = new Date(future);
        var d2 = new Date(now);
        if (d1 > d2) {
            _days = Math.floor(diff / (1000 * 60 * 60 * 24));
            _hours = Math.floor(diff / (1000 * 60 * 60));
            _mins = Math.floor(diff / (1000 * 60));
            _secs = Math.floor(diff / 1000);
            d = _days;
            h = _hours - _days * 24;
            m = _mins - _hours * 60;
            s = _secs - _mins * 60;
            if (d > 0) {
                setDays(d);
            }
            else {
                setDays(0);
            }
            if (h > 0) {
                setHours(h);
            }
            else {
                setHours(0);
            }
            if (m > 0) {
                setMinutes(m);
            }
            else {
                setMinutes(0);
            }
            if (s > 0) {
                setSeconds(s);
            }

        }
        else {
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
        }




    };

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);

        return () => clearInterval(interval);
    }, [deadline]);
    return (
        <>
            {
                days > 0 || hours > 0 || minutes > 0 || seconds > 0 ?

                    <div className="timer" role="timer">
                        <h4>The OTP code will expire in:</h4>
                        {
                            days != undefined && days > 0 ?

                                <div className="col-4">
                                    <div className="box">
                                        <p id="day">{days < 10 ? "0" + days : days}</p>
                                        <span className="text">Days</span>
                                    </div>
                                </div>
                                :
                                ""
                        }
                        {
                            hours != undefined && hours > 0 ?
                                <div className="col-4">
                                    <div className="box">
                                        <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
                                        <span className="text">Hours</span>
                                    </div>
                                </div>
                                :
                                ""
                        }
                        {
                            minutes > 0 ?
                                <div className="col-4">
                                    <div className="box">
                                        <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
                                        <span className="text">Minute{minutes > 0 ? 's' : ''}</span>
                                    </div>
                                </div>
                                :
                                ""
                        }
                        {
                            seconds > 0 ?

                                <div className="col-4">
                                    <div className="box">
                                        <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
                                        <span className="text">Seconds</span>
                                    </div>
                                </div>
                                :
                                ""
                        }

                    </div>
                    :
                    ""
            }

        </>
    )
}