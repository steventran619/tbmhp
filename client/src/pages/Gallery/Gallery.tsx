import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Image as ImageType } from '../../types';
import { SimpleGrid, Image, Loader } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { CloudGallery } from '../../components/CloudGallery/CloudGallery';


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
                    <a href="https://www.instagram.com/tb.mhp/">
                        <h2>Instagram Gallery</h2>
                    </a>
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, lg: 3 }}
                        spacing={{ base: 5, sm: 'xl' }}
                        verticalSpacing={{ base: 'sm', sm: 'md' }}>
                        {result.data?.map((image: ImageType) => (
                            <Image radius="md"
                                key={image.id}
                                w="450"
                                h="450"
                                fit="contain"
                                src={image.media_url}
                                alt={image.caption}
                                onClick={() => (window.location.href = image.media_url)}
                            // TODO: Add css for clickable cursor
                            />
                        ))}
                    </SimpleGrid>
                </>
            )}
            <CloudGallery />
        </>
    );
}