import { Container, Button, Text, Group, Badge, Box, BackgroundImage, Space } from '@mantine/core';
import classes from './EventBanner.module.css';
import useCheckEvents from '../../hooks/CheckEvents.ts/useCheckEvents';
import blurred_event from '../../images/blurred_event.jpg';
import { localDateTimeToDate } from '../../utils/localDateTimeToDate';


export function EventBanner() {
    const [events] = useCheckEvents();
    if (Array.isArray(events) && events.length > 0) {
        return (
            <div className={classes.wrapper}>
                <Box maw={1000} mx="auto" mah={300} my="auto" >
                    <BackgroundImage
                        src={events[0].logo.url ? events[0].logo.url : blurred_event}
                        radius="md"
                        component="button"
                        onClick={() => window.location.href = `${events[0].url}`}>
                        <Container className={classes.container}>
                            <Group justify="space-between">
                                <Text className={classes.title}
                                    variant="gradient"
                                    gradient={{ from: 'indigo', to: 'green', deg: 75 }}>
                                    {events[0].name.text}
                                </Text>
                                <Badge size="xl" color="teal"
                                    styles={{
                                        label: { color: 'white' }
                                    }}>
                                    {localDateTimeToDate(events[0].start.local)}
                                </Badge>
                            </Group>
                            <Text size="lg" c="white" fw={600}>
                                {events[0].description.text}
                            </Text>
                            <Space h="md" />
                            <Button
                                variant="default"
                                radius="md"
                                onClick={() => window.location.href = `${events[0].url}`}>
                                Click to Learn More
                            </Button>
                        </Container>
                    </BackgroundImage>
                </Box>
            </div>
        );
    }
    return (
        <></>
    );
}