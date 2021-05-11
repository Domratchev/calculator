import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material';
import { DisplayComponent, KeyboardComponent, ToolbarComponent } from './components';
import { AppComponent } from './containers';

export const COMPONENTS = [
  AppComponent,
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
