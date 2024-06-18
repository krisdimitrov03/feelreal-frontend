export type Event = {
    id: number;
    title: string;
    notes: string;
    dateTimeStart: string;
    dateTimeEnd: string;
    repeatMode: number;
    userId: string;
};

export type EventCreateModel = Omit<Event, 'id'>;

export type EventUpdateModel = Omit<EventCreateModel, 'userId'>;
