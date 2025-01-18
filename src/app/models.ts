export enum TaskState {
    TODO = "TO DO",
    IN_PROGRESS = "IN PROGRESS",
    TESTING = "TESTING",
    DONE = "DONE"
}

export interface Task {
    id: number;
    taskName: string;
    state: TaskState;
}