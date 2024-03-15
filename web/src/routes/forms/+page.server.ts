import type { Form } from "$lib/forms";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const forms: Form[] = [
        {
            id: "1244",
            name: "Survey 1",
            kind: "test",
            completed: false,
            opens_at: new Date(2024, 2, 14, 16, 30, 0),
            closes_at: new Date(2024, 2, 15, 17, 30, 0),
            time_limit: 5,
            owns: false,
            favourite: false
        },
        {
            id: "1244",
            name: "Survey 2",
            kind: "test",
            completed: false,
            time_limit: 5,
            owns: false,
            favourite: false
        },
        {
            id: "12",
            name: "Test 1",
            kind: "survey",
            completed: false,
            owns: true,
            favourite: false
        },
        {
            id: "151",
            name: "Test 2",
            kind: "survey",
            completed: true,
            owns: true,
            favourite: false
        },
        {
            id: "151",
            name: "Test 3 with name long enough to wrap itself to the next line, blah blah blah blah",
            kind: "survey",
            completed: true,
            opens_at: new Date(2024, 6),
            closes_at: new Date(2024, 7),
            owns: true,
            favourite: false
        },
        {
            id: "1000",
            name: "Test 4 with really really really really really really really really really really really really really really really really really long name!",
            kind: "survey",
            completed: false,
            owns: true,
            closes_at: new Date(2024, 2, 14, 18, 0, 0),
            favourite: true
        }
    ];
    return { forms };
};
