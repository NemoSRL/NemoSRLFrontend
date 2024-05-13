import { Component, Input } from '@angular/core';
import { Country } from '../Country';

import {NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-prodotti-detail',
  templateUrl: './prodotti-detail.component.html',
  styleUrl: './prodotti-detail.component.css'
})
export class ProdottiDetailComponent {
  @Input()country?: Country;
}
