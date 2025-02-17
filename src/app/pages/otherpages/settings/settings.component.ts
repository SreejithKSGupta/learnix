import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { UserChoicesService } from '../../../services/userchoices.service';

@Component({
  selector: 'app-settings',
  standalone:false,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm!:FormGroup;
  userChoicesForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private userChoicesService: UserChoicesService
  ) {
    this.initializeForms();
  }

  private initializeForms() {
    this.settingsForm = this.fb.group({
      isDarkMode: [false],
      primaryColor: ['#673ab7'],
      secondaryColor: ['#ffd740'],
      borderRadius: [4],
      padding: [16],
      transparency: [1],
      showparticles: [false],
    });

    this.userChoicesForm = this.fb.group({
      receiveEnrollmentNotifications: [true],
      receiveNewsletter: [true],
      receiveContactMessages: [true],
      receiveMessageReplies: [true],
      receiveOtherMessages: [true],
      reduceAnimations: [false],
      receiveRecommendations: [true],
      enableEmailNotifications: [true],
      enablePushNotifications: [false]
    });
  }

  ngOnInit() {
    this.initializeThemeSettings();
    this.initializeUserPreferences();
  }

  private initializeThemeSettings() {
    this.themeService.getSettings().subscribe({
      next: (settings) => {
        this.settingsForm.patchValue(settings, { emitEvent: false });
      },
      error: (error) => {
        console.error('Error loading theme settings:', error);
      }
    });

    this.settingsForm.valueChanges.subscribe({
      next: (values) => {
        this.themeService.updateSettings(values);
      },
      error: (error) => {
        console.error('Error updating theme settings:', error);
      }
    });
  }

  private initializeUserPreferences() {
    this.userChoicesService.getChoices().subscribe({
      next: (prefs) => {
        this.userChoicesForm.patchValue(prefs, { emitEvent: false });
      },
      error: (error) => {
        console.error('Error loading user preferences:', error);
      }
    });

    this.userChoicesForm.valueChanges.subscribe({
      next: (values) => {
        this.userChoicesService.updateChoices(values);
      },
      error: (error) => {
        console.error('Error updating user preferences:', error);
      }
    });
  }

  resetThemeSettings() {
    const defaultSettings = this.themeService.defaultSettings;
    this.settingsForm.patchValue(defaultSettings);
    this.themeService.updateSettings(defaultSettings);
  }

  resetUserPreferences() {
    const defaultChoices = this.userChoicesService.defaultChoices;
    this.userChoicesForm.patchValue(defaultChoices);
    this.userChoicesService.updateChoices(defaultChoices);
  }
}
