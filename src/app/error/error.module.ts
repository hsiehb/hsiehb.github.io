import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [ ErrorComponent ],
  providers: [],
  exports: [
    ErrorComponent
  ]
})
export class ErrorModule { }
