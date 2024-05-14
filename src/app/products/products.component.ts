import { Prodotto } from '../prodotti.service';
import { ProdottiService } from '../prodotti.service';

import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

import { Observable, of } from 'rxjs';


import { CountryService } from '../country.service';

export type SortColumn = keyof Prodotto| '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private productService : ProdottiService){}

	getProducts() : void {
		
			this.productService.readAllProdotti()
				.subscribe(products => this.products = products);
		  
	}

	ngOnInit(): void {
		this.getProducts();
	}

	products : Prodotto[] = [];
	selectedProduct? : Prodotto
	onSelect(prodotto: Prodotto): void {
		this.selectedProduct=prodotto
	}
	
}
