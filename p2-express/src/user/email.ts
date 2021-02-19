import emailService from '../dbfiles/services/email.service';

export class Email{
    public address: string = '';
    public username: string = '';
    public reason: string = '';
    public bannedBy: string = '';
}