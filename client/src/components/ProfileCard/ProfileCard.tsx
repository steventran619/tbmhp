import { Avatar, Text, Group, Card } from '@mantine/core';
import classes from './ProfileCard.module.css';
import { Profile } from '../../types';



export function ProfileCard() {
    return (
        <div>
            <Card padding="lg" radius="md" withBorder className={classes.wrapper}>
                <Group wrap="nowrap">
                    <Avatar
                        src="https://cdn2.iconfinder.com/data/icons/office-and-business-special-set-1/260/19-512.png"
                        size={200}
                        radius="md"
                    />
                    <div>
                        <Text fz="xl" fw={750} className={classes.name}>
                            Person
                        </Text>
                        <Text fz="lg" tt="uppercase" fw={400} c="dimmed">
                            President
                        </Text>
                        <Group wrap="nowrap" gap={10} mt={5}>
                            <Text fz="md" c="dimmed">
                                Person is the President of TBMHP. He is a graduate of the University of Wisconsin-Madison with a degree in Economics. He is currently working as a Financial Analyst at a large corporation in the Twin Cities. He is passionate about mental health and is excited to help TBMHP grow.
                            </Text>
                        </Group>
                    </div>
                </Group>
            </Card>
        </div>
    );
}