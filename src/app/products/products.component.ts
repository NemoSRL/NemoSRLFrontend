import { MessageService } from '../services/message.service';
import { Prodotto } from '../services/prodotti.service';
import { ProdottiService } from '../services/prodotti.service';
import { SortEvent, SortColumn, SortDirection } from '../sort-types'; 
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { Observable, of } from 'rxjs';
import { ProductEditDataService } from '../services/event.service';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (
  v1: string | number | undefined,
  v2: string | number | undefined
) => ((v1 ?? 0) < (v2 ?? 0) ? -1 : (v1 ?? 0) > (v2 ?? 0) ? 1 : 0);



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
  @ViewChild('selectAttributo', { static: false }) selectAttributo!: ElementRef;
  @ViewChild('inputValore', { static: false }) inputValore!: ElementRef;
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent): void {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    if (direction === '' || column === '') {
      this.products = this.products;
    } else {
      this.products = [...this.products].sort((a, b) => {
        const res = compare((a as any)[column], (b as any)[column]);
        return direction === 'asc' ? res : -res;
      });
    }

  }
  constructor(private productService: ProdottiService, private messageService : MessageService, private EditDataService : ProductEditDataService) {}
  textSearch: string = '';
  attributeSearch: string = '';
  
  public premuto(object : Prodotto): void {
    this.EditDataService.emitParam1(object);
  }

  getProductsBy(): void {
    console.log(`text: ${this.textSearch} attribute: ${this.attributeSearch}`)
    if (this.attributeSearch === '') {
      console.log("vuoto")
      return
    } else {
      this.productService
        .getProdottiBy(this.attributeSearch, this.textSearch)
        .subscribe((products) => (this.products = products), errore => this.messageService.add("Errore caricamento prodotti."));
        console.log("ies")
      }
  }
  getProducts(): void {
    this.productService
      .getAllProdotti()
      .subscribe((products) => (this.products = products), errore => this.messageService.add("Errore caricamento prodotti."));
      
  }

  ngOnInit(): void {
    this.getProducts();
  }
  resetButton() : void {
    this.getProducts();
    this.inputValore.nativeElement.value="aa";
    this.selectAttributo.nativeElement.selectedIndex=0;
  }
  products: Prodotto[] = [];

  onProductModified() {
    this.getProducts();
  }
}
