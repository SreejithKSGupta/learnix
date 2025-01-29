import { Injectable } from '@angular/core';
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
  constructor() {}
  sendEmail(
    emailtype: string = 'subscription',
    toEmail: string,
    toName: string = "Learner",
    fromName: string = "Learnix",
    subject: string = "Thank you for subscribing!",
    message: string = "Hello! Thank you for subscribing to learnix. We're excited to have you with us!"
  ): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_name: toName,
      from_name: fromName,
      to_email: toEmail,
      user: toEmail,
      subject: subject,
      message: message
    };

    // if (emailtype === 'subscription') {
    //   console.log("Email is a subscription.");
    //   return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);

    // } else if (emailtype === 'contactmessage') {

    //   console.log("Email is a contact message.");
    //   // return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);

    // } else if (emailtype === 'messagereply') {
    //   console.log("emailisa messagereply");

    //   return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
    // } else if (emailtype === 'othermsg') {
    //   console.log("emailisa othermessage");

    //   return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
    // }else {
    //   console.warn("Invalid email type provided:", emailtype);
    // }

      return Promise.resolve({ status: 200, text: "No email sent" } as EmailJSResponseStatus);
  }


}
