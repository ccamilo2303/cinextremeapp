import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { GeneroComponent } from './genero/genero.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { SeriesComponent } from './series/series.component';
import { TrailerComponent } from './trailer/trailer.component';
import {  AuthGuardService as AuthGuard  } from './auth-guard.service';

const routes: Routes = [{
  path: 'cartelera',
  component: CarteleraComponent,
  canActivate: [AuthGuard]
},
{
  path: 'genero/:id/:nombre',
  component: GeneroComponent,
  canActivate: [AuthGuard]
},
{
  path: 'pelicula/:idTMDB/:nombre',
  component: PeliculaComponent,
  canActivate: [AuthGuard]
},
{
  path: 'series',
  component: SeriesComponent,
  canActivate: [AuthGuard]
},
{
  path: 'trailer/:idTMDB/:nombre',
  component: TrailerComponent,
  canActivate: [AuthGuard]
},
{
  path: '**',
  redirectTo: 'cartelera',
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
