import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Event } from '../../types';
import { SimpleGrid, Card, Image, Loader, Container, Title, Text, Badge, Button, Group } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import events_blank from '../../images/events_blank.jpg';
import classes from './Events.module.css';


export const Events = (): React.ReactElement => {
    const getUpcomingEvents = async () => {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/events`);
        return res.json();
    };

    const getPastEvents = async () => {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/events/past`);
        return res.json();
    };

    const result = useQuery({
        queryKey: ['events'],
        queryFn: getUpcomingEvents,
        staleTime: 1000 * 60 * 5 // 5 minute cache
    })

    const pastEventsQuery = useQuery({
        queryKey: ['pastEvents'],
        queryFn: getPastEvents,
        staleTime: 1000 * 60 * 5 // 5 minute cache
    })

    function localDateTimeToDate(eventDateTime: string) {
        const date = new Date(eventDateTime);
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    }

    return (
        <>
            {result.isLoading ? (
                <Loader color="gray" type="dots" />
            ) : result.isError ? (
                <Text span><IconExclamationCircle></IconExclamationCircle> {result.error.message}</Text>
            ) : (
                <>
                    <Container size="90rem" className={classes.container}>
                        <Title order={1} ta="center">Events</Title>
                        {result.data?.events.length > 0 ? (
                            <SimpleGrid
                                className={classes.container}
                                cols={{ base: 1, sm: 2, lg: 3 }}
                                spacing={{ base: 5, sm: 'sm' }}
                                verticalSpacing={{ base: 'sm', sm: 'md' }}>
                                {result.data?.events.map((event: Event) => (
                                    <Container key={event.id} size="450">
                                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                                            <Card.Section component="a" href={event.url}>
                                                <Image
                                                    src={event.logo.url}
                                                    fallbackSrc={events_blank}
                                                    height={160}
                                                    alt=""
                                                />
                                            </Card.Section>
                                            <Group justify="space-between" mt="md" mb="xs">
                                                <Text fw={500}>{event.name.text}</Text>
                                                <Badge color="green" variant="light">
                                                    {localDateTimeToDate(event.start.local)}
                                                </Badge>
                                            </Group>

                                            <Text size="sm" c="dimmed" lineClamp={4}>
                                                {event.description.text}
                                            </Text>

                                            <Button variant="light"
                                                color={event.is_free ? "green" : "blue"}
                                                fullWidth mt="md"
                                                radius="md"
                                                onClick={() => window.location.href = `${event.url}`}>
                                                {event.is_free ? 'Free Registration' : 'Purchase Tickets'}
                                            </Button>
                                        </Card>
                                    </Container>
                                ))}
                            </SimpleGrid>) : (
                            <Text span ta="center">No upcoming events found.</Text>
                        )}
                    </Container>
                </>
            )}
            {/* Past Events */}
            {pastEventsQuery.isLoading ? (
                <></>
            ) : pastEventsQuery.isError ? (
                <Text span><IconExclamationCircle></IconExclamationCircle> {pastEventsQuery.error.message}</Text>
            ) : pastEventsQuery.data.events.length > 0 ? (
                <Container size="90rem" className={classes.container}>
                    <Title order={1} ta="center">Past Events</Title>
                    <SimpleGrid
                        className={classes.container}
                        cols={{ base: 1, sm: 2, lg: 3 }}
                        spacing={{ base: 5, sm: 'sm' }}
                        verticalSpacing={{ base: 'sm', sm: 'md' }}>
                        {pastEventsQuery.data.events.map((event: Event) => (
                            <Container key={event.id} size="450">
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Card.Section>
                                        <Image
                                            src={event.logo.url}
                                            fallbackSrc={events_blank}
                                            height={160}
                                            alt=""
                                            className={classes.dullImage}
                                        />
                                    </Card.Section>
                                    <Group justify="space-between" mt="md" mb="xs">
                                        <Text fw={500}>{event.name.text}</Text>
                                        <Badge color="green" variant="light">
                                            {localDateTimeToDate(event.start.local)}
                                        </Badge>
                                    </Group>

                                    <Text size="sm" c="dimmed" lineClamp={4}>
                                        {event.description.text}
                                    </Text>

                                    <Button variant="light" color="blue"
                                        fullWidth mt="md"
                                        radius="md"
                                        data-disabled
                                        onClick={(event) => event.preventDefault()}>
                                        {event.is_free ? 'Free Registration' : 'Purchase Tickets'}
                                    </Button>
                                </Card>
                            </Container>
                        ))}
                    </SimpleGrid>
                </Container>) :
                (<div id="no-past-events"></div>)
            }
        </>
    );
}