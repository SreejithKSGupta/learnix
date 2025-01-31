import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from '../../store/reducers/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', userReducer), // Pass feature name as string
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ]
})
export class StoredModule { }

