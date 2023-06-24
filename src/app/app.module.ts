import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebAudioComponent } from './web-audio-component/web-audio-component.component';

@NgModule({
  declarations: [
    AppComponent,
    WebAudioComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
