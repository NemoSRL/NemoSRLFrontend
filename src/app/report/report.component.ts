
import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Report } from '../report.service';
import { ReportService } from '../report.service';

export type SortColumn = keyof Report| '';
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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  constructor(private reportService : ReportService){}

	getReports() : void {
		
			this.reportService.readAllReport()
				.subscribe(reports => this.reports = reports);
		  
	}

	ngOnInit(): void {
		this.getReports();
	}

	reports : Report[] = [];
	selectedReport? : Report
	onSelect(report: Report): void {
		this.selectedReport=report
	}
	
}
