import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { ProdottiDetailComponent } from './prodotti-detail/prodotti-detail.component';

const routes: Routes = [
  {path : "prodotti", component : ProdottiComponent},
  {path : "prodotti/dettagli/:id", component : ProdottiDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
