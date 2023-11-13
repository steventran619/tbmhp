import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CloudinaryAlbum } from '../../types';
import { SimpleGrid, Image, Loader, Divider } from '@mantine/core';


export const CloudGallery = (): React.ReactElement => {
    const getCloudImages = async () => {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/gallery/cloudinary`);
        return res.json();
    };

    const result = useQuery({
        queryKey: ['cloudImages'],
        queryFn: getCloudImages,
        staleTime: 1000 * 60 * 5 // 5 minute cache
    })

    if (result.isLoading) {
        return (
            <Loader color="rgba(53, 128, 10, 1)" type="oval" />
        )
    }

    if (result.isError) {
        return (
            <span>Error: {result.error.message}</span>
        )
    }

    return (
        <div>
            {result.data?.map((album: CloudinaryAlbum, index: number) => (
                <div key={index}>
                    <Divider my="xl" size="md"/>
                    <h2>{album.album}</h2>
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, lg: 3 }}
                        spacing={{ base: 5, sm: 'xl' }}
                        verticalSpacing={{ base: 'sm', sm: 'md' }}>
                        {album.images.map((imageUrl, imageIndex) => (
                            <Image radius="md"
                            key={imageIndex}
                            w="450"
                            h="450"
                            fit="contain"
                            src={imageUrl}
                            alt="Image"
                            onClick={() => (window.location.href = imageUrl)}
                        />
                    ))}
                    </SimpleGrid>
                </div>
            ))}
        </div>
    )
};