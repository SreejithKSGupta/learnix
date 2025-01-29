import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-messagereply',
  standalone: false,

  templateUrl: './messagereply.component.html',
  styleUrl: './messagereply.component.css'
})
export class MessagereplyComponent {
  severityOptions: string[] = ['Low', 'Medium', 'High'];
  constructor(
    public dialogRef: MatDialogRef<MessagereplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, urgency: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
