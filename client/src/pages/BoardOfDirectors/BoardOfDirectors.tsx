import React, { useEffect } from 'react';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { Title, Text, Space } from '@mantine/core';
import { Profile } from '../../types';
import profilesData from './board.json';

export const BoardOfDirectors = (): React.ReactElement => {
    const [profiles, setProfiles] = React.useState<Profile[]>([]);

    useEffect(() => {
        setProfiles(profilesData);
    })


    return (
        <div>
            <Title order={1} ta="center">Board of Directors</Title>
            <Space h="lg" />
            <Text size="lg" fw={600} ta="center">Meet our <Text span variant="gradient"
                gradient={{ from: 'indigo', to: 'green', deg: 75 }} inherit>amazing</Text> team</Text>
            <Text size="lg" fw={400} ta="center">Our team is a mix of Tom&#39;s family and friends that are committed to the success of TBMHP and the
                mission that we strive to obtain.
            </Text>
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
        </div>
    );
}