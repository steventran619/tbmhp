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

// Events
export interface OrganizationEvents {
    pagination: Pagination;
    events: Event[];
}

export interface Event {
    name: Name;
    description: Description;
    url: string;
    start: Start;
    end: Start;
    organization_id: string;
    created: string;
    changed: string;
    published: string;
    capacity: number;
    capacity_is_custom: boolean;
    status: string;
    currency: string;
    listed: boolean;
    shareable: boolean;
    invite_only: boolean;
    online_event: boolean;
    show_remaining: boolean;
    tx_time_limit: number;
    hide_start_date: boolean;
    hide_end_date: boolean;
    locale: string;
    is_locked: boolean;
    privacy_setting: string;
    is_series: boolean;
    is_series_parent: boolean;
    inventory_type: string;
    is_reserved_seating: boolean;
    show_pick_a_seat: boolean;
    show_seatmap_thumbnail: boolean;
    show_colors_in_seatmap_thumbnail: boolean;
    source: string;
    is_free: boolean;
    version?: any;
    summary?: any;
    facebook_event_id?: any;
    logo_id?: any;
    organizer_id: string;
    venue_id?: any;
    category_id: string;
    subcategory_id: string;
    format_id: string;
    id: string;
    resource_uri: string;
    is_externally_ticketed: boolean;
    logo?: any;
}

export interface Start {
    timezone: string;
    local: string;
    utc: string;
}

interface Description {
    text?: any;
    html?: any;
}

interface Name {
    text: string;
    html: string;
}

interface Pagination {
    object_count: number;
    page_number: number;
    page_size: number;
    page_count: number;
    has_more_items: boolean;
}

export interface Profile {
    name: string;
    title: string;
    description: string;
    image: string;
}