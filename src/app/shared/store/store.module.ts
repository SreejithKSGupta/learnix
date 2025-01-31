import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { manageruserchange } from '../../store/actions/user.action';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ hello: manageruserchange }),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ]
})
export class StoredModule { }
