import { Component, Input } from '@angular/core';
import { Country } from '../Country';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { COUNTRIES } from '../mock-countries';
@Component({
  selector: 'app-prodotti-detail',
  templateUrl: './prodotti-detail.component.html',
  styleUrl: './prodotti-detail.component.css'
})


export class ProdottiDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}
  country = COUNTRIES[Number(this.route.snapshot.paramMap.get('id'))-1];
  
}
