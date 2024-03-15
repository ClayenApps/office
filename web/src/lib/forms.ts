export type Form = {
    id: `${number}`;
    name: string;
    kind: "survey" | "test";

    owns: boolean;
    completed: boolean;
    favourite: boolean;

    /** Time limit in minutes. */
    time_limit?: number;
    /** Date when form starts accepting responses. */
    opens_at?: Date;
    /** Date when form stops accepting responses. */
    closes_at?: Date;
};

export type Question = {
    title: string;
    options: string[];
    required?: boolean;
    multiple?: boolean;
};
