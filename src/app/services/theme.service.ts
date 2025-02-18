import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import CryptoJS from 'crypto-js';

export interface ThemeSettings {
  isDarkMode: boolean;
  primaryColor: string;
  secondaryColor: string;
  borderRadius: string;
  padding: string;
  transparency: number;
  showparticles: boolean;
  mainheadingcolor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme-settings';
  private readonly ENCRYPTION_KEY = 'my-secret-key-123';

  defaultSettings: ThemeSettings = {
    isDarkMode: false,
    primaryColor: '#673ab7',
    secondaryColor: '#ffd740',
    borderRadius: '14',
    padding: '16',
    transparency: 1,
    showparticles: false,
    mainheadingcolor: '#000000',
  };

  private themeSettings = new BehaviorSubject<ThemeSettings>(this.loadSettings());

  constructor() {
    this.themeSettings.subscribe(settings => {
      this.applyTheme(settings);
      this.saveSettings(settings);
    });
  }

  private encryptData(data: ThemeSettings): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.ENCRYPTION_KEY).toString();
  }

  private decryptData(ciphertext: string): ThemeSettings {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.ENCRYPTION_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Decryption failed, using default settings.', error);
      return this.defaultSettings;
    }
  }

  private loadSettings(): ThemeSettings {
    const encrypted = localStorage.getItem(this.STORAGE_KEY);
    return encrypted ? this.decryptData(encrypted) : this.defaultSettings;
  }

  private saveSettings(settings: ThemeSettings): void {
    const encrypted = this.encryptData(settings);
    localStorage.setItem(this.STORAGE_KEY, encrypted);
  }

  private generateColorVariations(color: string): { lighter: string; darker: string } {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const lighter = `#${[r, g, b].map(c => {
      const lighter = Math.round(c + (255 - c) * 0.3);
      return lighter.toString(16).padStart(2, '0');
    }).join('')}`;

    const darker = `#${[r, g, b].map(c => {
      const darker = Math.round(c * 0.8);
      return darker.toString(16).padStart(2, '0');
    }).join('')}`;

    return { lighter, darker };
  }

  toggleTheme(): void {
    const currentSettings = this.themeSettings.value;
    const newSettings = { ...currentSettings, isDarkMode: !currentSettings.isDarkMode };
    this.themeSettings.next(newSettings);
    this.saveSettings(newSettings);
    this.applyTheme(newSettings);
  }

  applyTheme(settings: ThemeSettings): void {
    const root = document.documentElement;

    if (settings.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }

    const primaryVariations = this.generateColorVariations(settings.primaryColor);
    const secondaryVariations = this.generateColorVariations(settings.secondaryColor);

    root.style.setProperty('--primary-color', settings.primaryColor);
    root.style.setProperty('--primary-lighter', primaryVariations.lighter);
    root.style.setProperty('--primary-darker', primaryVariations.darker);

    root.style.setProperty('--secondary-color', settings.secondaryColor);
    root.style.setProperty('--secondary-lighter', secondaryVariations.lighter);
    root.style.setProperty('--secondary-darker', secondaryVariations.darker);

    root.style.setProperty('--border-radius', `${settings.borderRadius}px`);
    root.style.setProperty('--padding', `${settings.padding}px`);
    root.style.setProperty('--transparency', settings.transparency.toString());
  }

  getSettings() {
    return this.themeSettings.asObservable();
  }

  updateSettings(settings: Partial<ThemeSettings>) {
    this.themeSettings.next({
      ...this.themeSettings.value,
      ...settings
    });
  }
}
