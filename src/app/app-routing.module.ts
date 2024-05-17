import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LabelComponent } from './label/label.component';
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [

  {path : "products" , component : ProductsComponent},
  {path : "labels" , component : LabelComponent},
  {path : "reports" , component : ReportComponent},
  {path : "" , component : HomeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
