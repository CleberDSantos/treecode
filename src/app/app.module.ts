import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { LeafletDrawModule } from '@asymmetrik/angular2-leaflet-draw';
import { SERVICE_LOCATIONS } from "../environments/environment";
import { Ajax } from "./helpers/ajax";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LeafletModule,
    LeafletDrawModule
  ],
  providers: [SERVICE_LOCATIONS, Ajax.Request,],
  bootstrap: [AppComponent]
})
export class AppModule { }
