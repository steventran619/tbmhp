import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CloudinaryAlbum } from '../../types';

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
            <span>Still Loading</span>
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
                    <h2>{album.album}</h2>
                    {album.images.map((imageUrl, imageIndex) => (
                        <img key={imageIndex} src={imageUrl} alt="Image" />
                    ))}
                </div>
            ))}
        </div>
    )
};