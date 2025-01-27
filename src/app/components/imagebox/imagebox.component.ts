import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-imagebox',
  standalone: false,
  templateUrl: './imagebox.component.html',
  styleUrls: ['./imagebox.component.css']
})
export class ImageboxComponent {
  selectedFile: File | null = null;
  uploadedFileName: string = '';
  imagePreview: string | null = null;

  // Define an Output property to emit the file
  @Output() fileSelected = new EventEmitter<File | null>();

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadedFileName = file.name;

      // Generate the preview (optional)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Emit the file to the parent
      this.fileSelected.emit(this.selectedFile);
    }
  }
}
