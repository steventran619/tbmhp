export interface Image {
    _id: string;
    id: string;
    media_type: string;
    media_url: string;
    children: any[];
    __v: number;
    caption?: string;
}

export interface CloudinaryAlbum {
    album: string;
    images: string[];
}