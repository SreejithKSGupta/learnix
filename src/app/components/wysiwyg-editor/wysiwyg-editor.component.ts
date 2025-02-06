import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import Quill from 'quill';
import { ImageHandler, Options } from 'ngx-quill-upload';
import { CloudinarymanagerService } from '../../services/cloudinarymanager.service';
import { FormControl } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-wysiwyg-editor',
  standalone: false,

  templateUrl: './wysiwyg-editor.component.html',
  styleUrl: './wysiwyg-editor.component.css',
})
export class WysiwygEditorComponent implements OnInit {
  @Output() richquilltxt = new EventEmitter<any>();

   delta: any;
  constructor(private cloudinarymanagerService: CloudinarymanagerService) {}
  editorModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
    imageHandler: {
      upload: (file: any): Promise<any> => {
        return new Promise((resolve, reject) => {
          if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg'
          ) {
            if (file.size < 10000000) {
              this.cloudinarymanagerService.uploadImage(file).subscribe(
                (res: any) => {
                  resolve(res);
                },
                (error: any) => {
                  reject('Upload failed');
                }
              );
            } else {
              reject('Size too large');
            }
          } else {
            reject('Unsupported type');
          }
        });
      },
      accepts: ['png', 'jpg', 'webp', 'jpeg', 'gif', 'avif'],
    },
    // trimOnValidation: true,
    // defaultEmptyValue: 'No description',
  };
  quillConfiguration = this.editorModules;
  @Input() control!: FormControl;

  ngOnInit() {
    this.control = this.control ?? new FormControl();
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log(event.editor.getContents().ops);
    this.delta = event.editor.getContents();
    this.richquilltxt.emit(this.delta);
  }
}
