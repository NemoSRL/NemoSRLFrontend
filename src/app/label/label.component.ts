import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import {etichette,EtichetteService} from "../service/etichette.service";
import {Report, ReportService} from "../service/report.service";

export type SortColumn = keyof etichette | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number | Date | boolean | undefined , v2: string | number | Date | boolean | undefined) => ((v1 ?? 0) < (v2 ?? 0) ? -1 : (v1 ?? 0) > (v2 ?? 0) ? 1 : 0);

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
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrl: './label.component.css'
})
export class LabelComponent{
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
      this.label = this.label;
    } else {
      this.label = [...this.label].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  textSearch: string = ""
  attributeSearch: string = ""
  getReportsBy() : void {
    if(this.attributeSearch === "" && this.textSearch===""){
      this.getReports()
    } else {
      this.reportService.readReportBy(this.attributeSearch, this.textSearch)
        .subscribe(reports => this.label = reports);
    }
  }
  constructor(private reportService : ReportService){}

  getReports() : void {

    this.reportService.readAllReport()
      .subscribe(reports => this.label = reports);

  }

  ngOnInit(): void {
    this.getReports();
  }

  label : etichette[] = [];

}
