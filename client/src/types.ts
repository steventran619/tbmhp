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

export interface NewsletterSubscriber {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    active: boolean;
    __v: number;
}