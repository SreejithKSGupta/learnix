import { Component } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
// Import Angular plugin.

@Component({
  selector: 'app-wysiwyg-editor',
  standalone: false,

  templateUrl: './wysiwyg-editor.component.html',
  styleUrl: './wysiwyg-editor.component.css',

})
export class WysiwygEditorComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Import Froala plugins dynamically only in the browser context
    if (isPlatformBrowser(this.platformId)) {
      // Import all Froala Editor plugins.
      // @ts-ignore
      // import('froala-editor/js/plugins.pkgd.min.js');

      // Import a single Froala Editor plugin.
      // @ts-ignore
      // import('froala-editor/js/plugins/align.min.js');

      // Import a Froala Editor language file.
      // @ts-ignore
      // import('froala-editor/js/languages/de.js');

      // Import a third-party plugin.
      // @ts-ignore
      // import('froala-editor/js/third_party/font_awesome.min');
      // @ts-ignore
      // import('froala-editor/js/third_party/image_tui.min');
      // @ts-ignore
      // import('froala-editor/js/third_party/spell_checker.min';
      // @ts-ignore
      // import('froala-editor/js/third_party/embedly.min');
    }
  }

}
