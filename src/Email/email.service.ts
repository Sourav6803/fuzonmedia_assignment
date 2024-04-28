
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type mailOptions = {
  subject: string;
  email: string;
  username: string;
  activation_code: string;
  template: string;
};

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendMail({subject, email, username, activation_code, template,}: mailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: { username, activation_code },
    });
  }
}
