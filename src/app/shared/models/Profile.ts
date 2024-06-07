import { Job } from "./Job";

export interface Profile {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    job: Job;
}

export type ProfileUpdateModel = Omit<Profile, 'id' | 'job'> & { jobId: string };