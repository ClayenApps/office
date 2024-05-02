export default interface EmailService {
    send(email: string, subject: string, content: string): Promise<void>;
}
