import React, { useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CalendarEventModal from './CalendarEventModal';
import api from '../Api';
import { UserContext } from '../../pages/DashboardPage';

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = (props) => {
    const [events, setEvents] = useState([]);
    const tempEvents = [];

    // Imported user email
    const { userEmail } = useContext(UserContext);

    useEffect(() => {
        if (userEmail) {
            api.getCalendarEvents(userEmail).then(res => {
                res.data.forEach(event => {
                    let start_at = new Date(event.start);
                    let end_at = new Date(event.end);
                    tempEvents.push({
                        title: event.title,
                        start: start_at,
                        end: end_at
                    })
                })
                setEvents(tempEvents)
            }).catch(err => {
                console.log(err)
            })
        }
    },[tempEvents, userEmail])

    const createEvent = async (title, startDate, endDate) => {
        try {
            const payload ={
                email: userEmail,
                title: title,
                start: startDate,
                end: endDate
            }
            await api.createCalendarEvent(payload);
            const response = await api.getCalendarEvents(userEmail);
            response.data.forEach(event => {
                let start_at = new Date(event.start);
                let end_at = new Date(event.end);
                tempEvents.push({
                    title: event.title,
                    start: start_at,
                    end: end_at
                })
            })
            setEvents(tempEvents)
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <div>
            <div>
                <CalendarEventModal
                    createEvent={createEvent}
                />
            </div>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "80vh", clear: 'both' }}
                onSelectEvent={(event) => console.log(event)}
            />
        </div>
    )
}

export default BigCalendar