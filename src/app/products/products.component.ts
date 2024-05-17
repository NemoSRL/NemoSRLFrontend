import { Prodotto } from '../services/prodotti.service';
import { ProdottiService } from '../services/prodotti.service';

import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { Observable, of } from 'rxjs';

export type SortColumn = keyof Prodotto | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (
  v1: string | number | undefined,
  v2: string | number | undefined
) => ((v1 ?? 0) < (v2 ?? 0) ? -1 : (v1 ?? 0) > (v2 ?? 0) ? 1 : 0);

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
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    // sorting countries
    if (direction === '' || column === '') {
      this.products = this.products;
    } else {
      this.products = [...this.products].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  constructor(private productService: ProdottiService) {}
  textSearch: string = '';
  attributeSearch: string = '';
  getProductsBy(): void {
    if (this.attributeSearch === '') {
      return
    } else {
      this.productService
        .getProdottiBy(this.attributeSearch, this.textSearch)
        .subscribe((products) => (this.products = products));
    }
  }
  getProducts(): void {
    this.productService
      .getAllProdotti()
      .subscribe((products) => (this.products = products));
  }

  ngOnInit(): void {
    this.getProducts();
  }

  products: Prodotto[] = [];
}
