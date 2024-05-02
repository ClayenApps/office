export class Question {
    constructor(
        public body: Body,
        public answer: string
    ) {}
}

class TextQuestion extends Question {}

export type Body = { text: string } | { photo: string };

export type QuestionKind =
    | "short-text"
    | "long-text"
    | "number"
    | "paragraph"
    | "radio"
    | "checkbox"
    | "dropdown";
