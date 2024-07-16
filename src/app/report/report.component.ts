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
import { SortEvent, SortColumn, SortDirection } from '../sort-types'; 
import { ReportEditDataService, LabelDetailDataService, PersonaleDetailDataService } from '../services/event.service';
import { Personale } from '../services/personale.service';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (
  v1: string | number | Date | undefined | boolean,
  v2: string | number | Date | undefined | boolean
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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;
  
  onSort({ column, direction }: SortEvent): void {
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    if (direction === '' || column === '') {
      this.reports = this.reports;
    } else {
      this.reports = [...this.reports].sort((a, b) => {
        const res = compare((a as any)[column], (b as any)[column]);
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
  constructor(private reportService: ReportService, private messageService : MessageService, private editDataService : ReportEditDataService, private personaleDetailDataService : PersonaleDetailDataService, private labelDetailDataService : LabelDetailDataService) {}
  public premuto(object : any, tipo : string): void {
    if(tipo==="edit") this.editDataService.emitParam1(object as Report);
    if(tipo==="personale") this.personaleDetailDataService.emitParam1(object as string)
    if(tipo==="label") this.labelDetailDataService.emitParam1(object as number)
      
  }
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

  onReportModified(){
    this.getReports();
  }
}
