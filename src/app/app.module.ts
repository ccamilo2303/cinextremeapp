import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { GeneroComponent } from './genero/genero.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { SeriesComponent } from './series/series.component';
import { TrailerComponent } from './trailer/trailer.component';

@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    GeneroComponent,
    PeliculaComponent,
    SeriesComponent,
    TrailerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
