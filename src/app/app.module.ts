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

@NgModule({
  declarations: [

    AppComponent,
    ProdottiComponent,
    NavbarComponent,
    ProdottiDetailComponent
  ],
  imports: [ 
    NgbdSortableHeader,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DecimalPipe, 
    AsyncPipe, ReactiveFormsModule, NgbHighlight,
    FormsModule, NgIf, UpperCasePipe
  ],
  providers: [
    { provide: "API_URL", useValue: NemoConfig.apiUrl }, DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
