import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { GeneroComponent } from './genero/genero.component';
import { PeliculaComponent } from './pelicula/pelicula.component';

const routes: Routes = [{
  path: 'cartelera',
  component: CarteleraComponent
},
{
  path: 'genero/:id/:nombre',
  component: GeneroComponent
},
{
  path: 'pelicula/:idTMDB/:nombre',
  component: PeliculaComponent
},
{
  path: '**',
  redirectTo: 'cartelera'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
