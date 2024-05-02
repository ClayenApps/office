/** Evaluates */
export interface AnswerEval<T> {
    /**
     * Evaluates answer given to the question.
     * @returns Points given for the question.
     */
    evaluate(val: T): number;
}

export class TextAnswerEval implements AnswerEval<string> {
    constructor(
        public points: number,
        public validAnswer: string[],
        public matchCase: boolean = false,
        public matchSpaces: boolean = false
    ) {}

    evaluate(val: string): number {
        let given = val;
        let valid = this.validAnswer;
        if (!this.matchCase) {
            given = given.toLowerCase();
            valid = valid.map(x => x.toLowerCase());
        }
        if (!this.matchSpaces) {
            given = given.replaceAll(" ", "");
            valid = valid.map(x => x.replaceAll(" ", ""));
        }
        if (valid.includes(given)) return this.points;
        else return 0;
    }
}

export class NumberAnswerEval implements AnswerEval<number> {
    constructor(
        public points: number,
        public answer: number,
        public rounding: number
    ) {}

    evaluate(val: number): number {
        let val_str = this.points.toFixed(this.rounding);
        let answer_str = this.answer.toFixed(this.rounding);
        if (val_str == answer_str) return this.points;
        else return 0;
    }
}

export class ChoiceAnswerEval implements AnswerEval<string[]> {
    constructor(
        public points: number,
        public validAnswer: string
    ) {}

    evaluate(vals: string[]): number {
        return 0;
    }
}
