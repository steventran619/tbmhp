import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { OrganizationEvents, Event, Start } from '../../types';
import { SimpleGrid, Card, Image, Loader, Container, Title, Text, Badge, Button, Group } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import events_blank from '../../images/events_blank.jpg';


export const Events = (): React.ReactElement => {
    const getUpcomingEvents = async () => {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/events`);
        return res.json();
    };

    const result = useQuery({
        queryKey: ['events'],
        queryFn: getUpcomingEvents,
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
                <Loader color="rgba(53, 128, 10, 1)" type="bars" />
            ) : result.isError ? (
                <span><IconExclamationCircle></IconExclamationCircle> {result.error.message}</span>
            ) : (
                <>
                    <Container size="90rem">
                        <Title order={1}>Events</Title>
                        <SimpleGrid
                            cols={{ base: 1, sm: 2, lg: 3 }}
                            spacing={{ base: 5, sm: 'sm' }}
                            verticalSpacing={{ base: 'sm', sm: 'md' }}>
                            {result.data?.events.map((event: Event) => (
                                <Container key={event.id} size="450">
                                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                                        <Card.Section component="a" href={event.url}>
                                            <Image
                                                src={event.logo.url ? event.logo.url : events_blank}
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

                                        <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => window.location.href = `${event.url}`}>
                                            {event.is_free ? 'Free Registration' : 'Purchase Tickets'}
                                        </Button>
                                    </Card>
                                </Container>
                            ))}
                        </SimpleGrid>
                    </Container>
                </>
            )}
        </>
    );
}