
// settings.component.ts
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
checked: any;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService
  ) {
    this.settingsForm = this.fb.group({
      isDarkMode: [false],
      primaryColor: ['#673ab7'],
      secondaryColor: ['#ffd740'],
      borderRadius: [4],
      padding: [16],
      transparency: [1],
      showparticles: [false]
    });
  }

  ngOnInit() {
    // Load current settings
    this.themeService.getSettings().subscribe(settings => {
      this.settingsForm.patchValue(settings, { emitEvent: false });
    });

    // Subscribe to form changes
    this.settingsForm.valueChanges.subscribe(values => {
      this.themeService.updateSettings(values);
    });
  }
}
