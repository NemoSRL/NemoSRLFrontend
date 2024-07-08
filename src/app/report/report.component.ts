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

import { Observable, of } from 'rxjs';
import { Report } from '../services/report.service';
import { ReportService } from '../services/report.service';
import { EtichetteService, Etichetta } from '../services/etichette.service';
import { MessageService } from '../services/message.service';
export type SortColumn = keyof Report | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (
  v1: string | number | Date | undefined | boolean,
  v2: string | number | Date | undefined | boolean
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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
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
      this.reports = this.reports;
    } else {
      this.reports = [...this.reports].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  textSearch: string = '';
  attributeSearch: string = '';
  getReportsBy(): void {
    if (this.attributeSearch === '') {
      return
    } else {
      this.reportService
        .getReportsBy(this.attributeSearch, this.textSearch)
        .subscribe((reports) => (this.reports = reports), errore => this.messageService.add("Errore caricamento reports."));
    }
  }
  constructor(private reportService: ReportService, private messageService : MessageService) {}

  getReports(): void {
    this.reportService
      .getAllReports()
      .subscribe((reports) => (this.reports = reports), errore => this.messageService.add("Errore caricamento reports."));
  }

  ngOnInit(): void {
    this.getReports();
  }
  @ViewChild('selectAttributo', { static: false }) selectAttributo!: ElementRef;
  @ViewChild('inputValore', { static: false }) inputValore!: ElementRef;
  resetButton() : void {
    this.getReports();
    this.inputValore.nativeElement.value="";
    this.selectAttributo.nativeElement.selectedIndex=0;
  }
  reports: Report[] = [];
}
