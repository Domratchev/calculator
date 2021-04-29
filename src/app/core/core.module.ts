import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material';
import { ButtonComponent, DisplayComponent, KeyboardComponent, ToolbarComponent } from './components';
import { AppComponent } from './containers';

export const COMPONENTS = [
  AppComponent,
  ButtonComponent,
  DisplayComponent,
  KeyboardComponent,
  ToolbarComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, MaterialModule],
  providers: [],
  exports: COMPONENTS
})
export class CoreModule { }
