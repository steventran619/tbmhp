import { Avatar, Text, Group, Card } from '@mantine/core';
import classes from './ProfileCard.module.css';
import { Profile } from '../../types';



export function ProfileCard(person: Profile) {
    return (
        <div>
            <Card padding="lg" radius="md" withBorder className={classes.wrapper}>
                <Group wrap="nowrap">
                    <Avatar
                        src={person.image}
                        size={250}
                        radius="md"
                        alt={`${person.name}'s head shot`}
                    />
                    <div>
                        <Text fz="xl" fw={750} className={classes.name}>
                            {person.name}
                        </Text>
                        <Text fz="md" tt="uppercase" fw={300} c="dimmed">
                            {person.title}
                        </Text>
                        <Group wrap="nowrap" gap={10} mt={5}>
                            <Text fz="md" c="dimmed">
                                {person.description}
                            </Text>
                        </Group>
                    </div>
                </Group>
            </Card>
        </div>
    );
}