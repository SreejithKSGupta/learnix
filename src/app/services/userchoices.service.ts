import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import CryptoJS from 'crypto-js';

export interface UserChoices {
  receiveEnrollmentNotifications: boolean;
  receiveNewsletter: boolean;
  receiveContactMessages: boolean;
  receiveMessageReplies: boolean;
  receiveOtherMessages: boolean;
  reduceAnimations: boolean;
  receiveRecommendations: boolean;
  enableEmailNotifications: boolean;
  enablePushNotifications: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserChoicesService {
  private readonly STORAGE_KEY = 'user-choices-settings';
  private readonly ENCRYPTION_KEY = 'my-secret-key-123'; // Change this to a secure key

   defaultChoices: UserChoices = {
    receiveEnrollmentNotifications: true,
    receiveNewsletter: true,
    receiveContactMessages: true,
    receiveMessageReplies: true,
    receiveOtherMessages: false,
    reduceAnimations: false,
    receiveRecommendations: true,
    enableEmailNotifications: true,
    enablePushNotifications: false,
  };

  private userChoices = new BehaviorSubject<UserChoices>(this.loadChoices());

  constructor() {
    this.userChoices.subscribe(choices => {
      this.saveChoices(choices);
      this.applyUserPreferences(choices);
    });
  }

  private encryptData(data: UserChoices): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.ENCRYPTION_KEY).toString();
  }

  private decryptData(ciphertext: string): UserChoices {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.ENCRYPTION_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Decryption failed, using default settings.', error);
      return this.defaultChoices;
    }
  }

  private loadChoices(): UserChoices {
    const encrypted = localStorage.getItem(this.STORAGE_KEY);
    return encrypted ? this.decryptData(encrypted) : this.defaultChoices;
  }

  private saveChoices(choices: UserChoices): void {
    const encrypted = this.encryptData(choices);
    localStorage.setItem(this.STORAGE_KEY, encrypted);
  }

  private applyUserPreferences(choices: UserChoices): void {
    const root = document.documentElement;

    // Reduce animations based on user preference
    root.style.setProperty('--animation-duration', choices.reduceAnimations ? '0s' : '0.3s');
  }

  getChoices() {
    return this.userChoices.asObservable();
  }

  updateChoices(updates: Partial<UserChoices>) {
    this.userChoices.next({
      ...this.userChoices.value,
      ...updates
    });
  }
}
