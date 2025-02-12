import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { AdmindataService } from './../../services/admindata.service';
import { OtherServices } from './../../services/otherservices.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  footertitle = 'Learnix';
  logo = 'https://res.cloudinary.com/dhrye1aew/image/upload/v1737975952/zzmfodapfta2x4yeqzxs.webp';
  address: any;
  socialLinks: any;
  pages: any;
  currentYear = new Date().getFullYear();
  newsletterForm: FormGroup;
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private emailService: EmailService,
    private admindataService: AdmindataService,
    private otherServices: OtherServices,
    private fb: FormBuilder
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadFooterData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFooterData() {
    this.otherServices.getappdata()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.footertitle = data.title;
          this.logo = data.logo;
          this.address = data.address;
          this.socialLinks = data.socials;
          this.pages = data.footernavlinks;
        },
        error: (error) => {
          console.error('Error loading footer data:', error);
          this.otherServices.showalert('error', 'Failed to load footer data');
        }
      });
  }

  async subscribeToNewsletter() {
    if (this.newsletterForm.valid && !this.loading) {
      this.loading = true;
      const email = this.newsletterForm.get('email')?.value;

      try {
        const subscriptionResult = await this.admindataService.addtosubscribers(email).toPromise();

        if (subscriptionResult !== false) {
          await this.emailService.sendEmail('subscription', email);
          this.otherServices.showalert('success', 'Thank you for subscribing! Check your email for confirmation.');
          this.newsletterForm.reset();
        } else {
          this.otherServices.showalert('info', 'This email is already subscribed');
        }
      } catch (error) {
        console.error('Subscription error:', error);
        this.otherServices.showalert('error', 'Failed to process subscription. Please try again.');
      } finally {
        this.loading = false;
      }
    }
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
