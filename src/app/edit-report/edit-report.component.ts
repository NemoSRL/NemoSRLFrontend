import { Component, inject, TemplateRef, Input } from '@angular/core';
import { Report } from '../report.service';
import { ReportService } from '../report.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrl: './edit-report.component.css'
})
export class EditReportComponent {
  etichetta?:number
  data?: Date
  dettagli?: string
  personale?: string
  constructor(private reportService : ReportService){}
  @Input() report?: Report

  tempReport?: Report
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  editReport(): void{
    this.modalService.dismissAll()
    
    
    this.reportService.updateReport({id: this.report?.id, data:this.data, dettagli: this.dettagli, etichetta : this.etichetta, personale : this.personale}).subscribe()
  
  }
  deleteReport(): void{
    this.modalService.dismissAll()
    this.reportService.deleteReport(this.report?.id ?? -1).subscribe()
  }
}
