import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

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

  sendEmail(toEmail: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_name: "Learner",
      from_name:"Learnix",
      to_email: toEmail,
      subject: 'Thank you for subscribing!',
      message: `Hello! Thank you for subscribing to ${'Learnix'}. We're excited to have you with us!`
    };

    return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
  }
}
