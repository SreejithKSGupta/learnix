import { Injectable } from '@angular/core';
import { UserChoicesService } from './userchoices.service';

import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_38fyude';
  private templateId = 'template_sgihkfg';
  private userId = 'JCFGdn35jddlObtV9';
  // private 2L9rLAQeTZA-SFs44_nC_
  // public JCFGdn35jddlObtV9
  constructor(private userChoicesService: UserChoicesService) {}
  sendEmail(
    emailtype: string = 'subscription',
    toEmail: string,
    toName: string = "Learner",
    fromName: string = "Learnix",
    subject: string = "Thank you for subscribing!",
    message: string = "Hello! Thank you for subscribing to learnix. We're excited to have you with us!"
  ): Promise<EmailJSResponseStatus> {
    // Get the user's choices
    const userChoices = this.userChoicesService.getChoices();

    return userChoices.toPromise().then(choices => {
      // Check if email notifications are enabled

        const templateParams = {
          to_name: toName,
          from_name: fromName,
          to_email: toEmail,
          user: toEmail,
          subject: subject,
          message: message
        };

        if (emailtype === 'otp' && choices!.receiveEnrollmentNotifications) {
          return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
        }
        if (choices!.enableEmailNotifications) {
        // Send email based on the email type and user's preferences
       if (emailtype === 'subscription' && choices!.receiveNewsletter) {
          return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
        } else if (emailtype === 'contactmessage' && choices!.receiveContactMessages) {
          return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
        } else if (emailtype === 'messagereply' && choices!.receiveMessageReplies) {
          return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
        } else if (emailtype === 'othermsg' && choices!.receiveOtherMessages) {
          return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
        } else {
          console.warn("Email not sent due to user preferences or invalid email type.");
        }
      } else {
        console.warn("Email notifications are disabled.");
      }

      return Promise.resolve({ status: 200, text: "No email sent" } as EmailJSResponseStatus);
    });
  }


}
