import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Etichetta, EtichetteService } from '../services/etichette.service';
import { MessageService } from '../services/message.service';
import { SortEvent, SortColumn, SortDirection } from '../sort-types'; 

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (
  v1: string | number | Date | boolean | undefined,
  v2: string | number | Date | boolean | undefined
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
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrl: './label.component.css',
})
export class LabelComponent {
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;
  onSort({ column, direction }: SortEvent): void {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    if (direction === '' || column === '') {
      this.labels = this.labels;
    } else {
      this.labels = [...this.labels].sort((a, b) => {
        const res = compare((a as any)[column], (b as any)[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  textSearch: string = '';
  attributeSearch: string = '';
  getLabelsBy(): void {
    if (this.attributeSearch === '') {
      return
    } else {
      this.labelService
        .readEtichetteBy(this.attributeSearch, this.textSearch)
        .subscribe((labels) => (this.labels = labels), errore => this.messageService.add("Errore caricamento etichette."));
    }
  }
  constructor(private labelService: EtichetteService, private messageService : MessageService) {}

  getLabels(): void {
    this.labelService
      .readAllEtichette()
      .subscribe((labels) => {this.labels = labels; console.log(this.labels)}, errore => this.messageService.add("Errore caricamento etichette."));
  }

  ngOnInit(): void {
    this.getLabels();
    console.log(this.labels)
  }
  @ViewChild('selectAttributo', { static: false }) selectAttributo!: ElementRef;
  @ViewChild('inputValore', { static: false }) inputValore!: ElementRef;
  resetButton() : void {
    this.getLabels();
    this.inputValore.nativeElement.value="";
    this.selectAttributo.nativeElement.selectedIndex=0;
  }

  labels: Etichetta[] = [];
  onLabelModified(){
    this.getLabels();
  }
}
