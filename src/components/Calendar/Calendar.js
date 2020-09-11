import React, { Component, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CalendarEventModal from './CalendarEventModal';

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
    const [start, setStart] = useState(moment().toDate());
    const [end, setEnd] = useState(moment().add(1, "days").toDate());
    const [title, setTitle] = useState('Some title');
    const [events, setEvents] = useState([{
        start,
        end,
        title
    }]);

    return (
        <div>
            <div>
                <CalendarEventModal />
            </div>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "80vh", clear: 'both' }}
            />
        </div>
    )
}

export default BigCalendar