export type Event = {
    id: number;
    title: string;
    notes: string;
    dateTimeStart: string;
    dateTimeEnd: string;
    repeatMode: number;
};

export type EventCreateModel = Omit<Event, 'id'>;

export type EventUpdateModel = Omit<Event, 'id'>;
