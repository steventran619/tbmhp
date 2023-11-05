import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Image as ImageType } from '../../types';
import { SimpleGrid, Image, Loader } from '@mantine/core';

export const Gallery = (): React.ReactElement => {
    const getMongoImages = async () => {
        const res = await fetch(' http://localhost:3000/gallery');
        return res.json();
    };

    const result = useQuery({ queryKey: ['images'], queryFn: getMongoImages })

    return (
        <div>
            <h2>Instagram Gallery</h2>
            {result.isLoading ? (
                <Loader color="rgba(53, 128, 10, 1)" type="bars" size={50}/>
            ) : result.isError ? (
                <span>Error: {result.error.message}</span>
            ) : (
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
            )
            }
        </div >
    );
}