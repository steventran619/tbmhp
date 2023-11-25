import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Image as ImageType } from '../../types';
import { SimpleGrid, Image, Loader, Container, Title, Space } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { CloudGallery } from '../../components/CloudGallery/CloudGallery';
import classes from './Gallery.module.css';


export const Gallery = (): React.ReactElement => {
    const getMongoImages = async () => {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/gallery`);
        return res.json();
    };

    const result = useQuery({
        queryKey: ['images'],
        queryFn: getMongoImages,
        staleTime: 1000 * 60 * 5 // 5 minute cache
    })

    return (
        <>
            {result.isLoading ? (
                <Loader color="rgba(53, 128, 10, 1)" type="bars" />
            ) : result.isError ? (
                <span><IconExclamationCircle></IconExclamationCircle> {result.error.message}</span>
            ) : (
                <>
                    <Container size="90rem">
                    <Title order={1} ta="center">Instagram Gallery</Title>
                    <Space h="md" />
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, lg: 3 }}
                        spacing={{ base: 5, sm: 'xl' }}
                        verticalSpacing={{ base: 'sm', sm: 'md' }}>
                        {result.data?.map((image: ImageType) => (
                            <Container key={image.id} size="450">
                                <Image radius="md"
                                    key={image.id}
                                    h="450"
                                    fit="cover"
                                    src={image.media_url}
                                    alt={image.caption}
                                    className = {classes.image}
                                    onClick={() => (window.location.href = image.media_url)}
                                // TODO: Add css for clickable cursor
                                />
                            </Container>
                        ))}
                        
                    </SimpleGrid>
                    <CloudGallery />
                    </Container>
                </>
            )}
            
        </>
    );
}