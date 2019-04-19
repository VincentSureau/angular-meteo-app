import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule, MatGridListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MeteoComponent } from './meteo/meteo.component';
import { CelsiusPipe } from './pipe/celsius';

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    CelsiusPipe
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
