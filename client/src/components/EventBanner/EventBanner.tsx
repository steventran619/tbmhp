import { Card, Overlay, Button, Text, Grid } from '@mantine/core';
import classes from './EventBanner.module.css';
import useCheckEvents from '../../hooks/CheckEvents.ts/useCheckEvents';
import { Image } from '@mantine/core';
import events_blank from '../../images/events_blank.jpg';
import { localDateTimeToDate } from '../../utils/localDateTimeToDate';


export function EventBanner() {
    const [events] = useCheckEvents();
    if (Array.isArray(events) && events.length > 0) {
        return (
            <Card radius="lg" className={classes.card}>
                <Image src={events[0].logo.url} fit="contain" radius="lg" h="auto" fallbackSrc={events_blank}/>
                {/* <Overlay className={classes.overlay} opacity={0.55} zIndex={0} /> */}

                <div className={classes.content}>
                    <Text size="lg" fw={700} className={classes.title}>
                        {events[0].name.text}
                    </Text>
                    <Grid>
                    <Text size="lg" className={classes.description}>
                        {events[0].description.text}
                    </Text>
                    <Text>
                        {localDateTimeToDate(events[0].start.local)}
                    </Text>
                    </Grid>

                    <Button className={classes.action} variant="filled" color="white" size="lg" onClick={() => window.location.href = `${events[0].url}`}>
                        Register Today!
                    </Button>
                </div>
            </Card>
        );
    }
    return (
        <></>
    );
}