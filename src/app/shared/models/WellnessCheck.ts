export interface WellnessCheck {
    id: string;
    date: Date;
    type: number;
    value: number;
    userId: string;
};

export type WellnessCheckCreateModel = Omit<WellnessCheck, 'id'>;