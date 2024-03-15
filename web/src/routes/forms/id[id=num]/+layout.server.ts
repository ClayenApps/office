import type { Form, Question } from "$lib/forms";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
    return {
        form: {
            id: params.id,
            name: "My Form!",
            closes_at: new Date(new Date().getTime() + 60 * 60 * 1000)
        } as Form,
        questions: [
            { title: "Do you like cats?", required: true, options: ["Yes", "No"] },
            { title: "What drinks do you like?", options: ["Water", "Milk", "Tea"] }
        ] as Question[]
    };
};
