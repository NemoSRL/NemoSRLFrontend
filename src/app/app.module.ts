import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgbdSortableHeader } from './prodotti/prodotti.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NemoConfig } from '../config';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { ProdottiDetailComponent } from './prodotti-detail/prodotti-detail.component';
import { NgIf } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddProdottiComponent } from './add-prodotti/add-prodotti.component';
import { EditProdottiComponent } from './edit-prodotti/edit-prodotti.component';
import { ProductsComponent } from './products/products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { AddProductsComponent } from './add-products/add-products.component';

@NgModule({
  declarations: [

    AppComponent,
    ProdottiComponent,
    NavbarComponent,
    ProdottiDetailComponent,
    AddProdottiComponent,
    EditProdottiComponent,
    ProductsComponent,
    EditProductsComponent,
    AddProductsComponent
  ],
  imports: [ 
    NgbdSortableHeader,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DecimalPipe, 
    AsyncPipe, ReactiveFormsModule, NgbHighlight,
    FormsModule, NgIf, UpperCasePipe,
    HttpClientModule
  ],
  providers: [
    { provide: "API_URL", useValue: NemoConfig.apiUrl }, DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
