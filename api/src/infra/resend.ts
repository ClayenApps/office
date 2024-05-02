import { Resend } from "resend";
import EmailService from "../domain/email.js";

export class ResendEmailService implements EmailService {
    private resend: Resend;

    constructor(private key: string) {
        this.resend = new Resend(key);
    }

    async send(email: string, subject: string, content: string): Promise<void> {
        const { data, error } = await this.resend.emails.send({
            from: `ClayenOffice <${process.env.RESEND_SENDER!}>`,
            to: [email],
            subject,
            html: content
        });

        if (error) {
            return console.error({ error });
        }

        console.log({ data });
    }
}
