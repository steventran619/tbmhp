import React from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Event } from '../../types';

export default function useCheckEvents() {
    const [events, setEvents] = React.useState<Event[] | null>(null);

    const getUpcomingEvents = async () => {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/events`);
        return res.json();
    };

    const result = useQuery({
        queryKey: ['upcomingEvents'],
        queryFn: getUpcomingEvents,
        staleTime: 1000 * 60 * 5 // 5 minute cache
    })

    useEffect(() => {
        console.log("Use Effect for checking upcoming");
        if (result.data) {
            setEvents(result.data.events);
        }
    }, [result.data]);

    return [events, result.isLoading, result.error];
}