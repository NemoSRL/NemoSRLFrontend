import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NemoConfig } from '../config';

import { NavbarComponent } from './navbar/navbar.component';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { LabelComponent } from './label/label.component';
import { AddLabelComponent } from './add-label/add-label.component';
import { EditLabelComponent } from './edit-label/edit-label.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    
    NavbarComponent,

    
    ProductsComponent,
    EditProductsComponent,
    AddProductsComponent,
    LabelComponent,
    AddLabelComponent,
    EditLabelComponent,
    EditReportComponent,
    AddReportComponent,
    ReportComponent
  ],
  imports: [ 

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
