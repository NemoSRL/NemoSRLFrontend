import { Component, inject, TemplateRef, Input } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ReportService,Report} from "../report.service";


@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrl: './edit-report.component.css'
})
export class EditReportComponent {
  etichetta?:number =-1;
  data?: Date = new Date('2000-00-00');
  dettagli?: string ="";
  personale?: number=-1;
  constructor(private reportService : ReportService){}
  @Input() report?: Report
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

  editReport() : void {
    this.modalService.dismissAll()
    const updatedReport: Report={
      id: this.report?.id ?? -1,
      etichetta:this.etichetta,
      data:this.data,
      dettagli:this.dettagli,
      personale:this.personale
    };
    console.log(updatedReport)
    this.reportService.updateReport(updatedReport).subscribe()
  }

  deleteReport(): void{
    this.modalService.dismissAll(
      this.reportService.deleteReport(this.report?.id??-1).subscribe()
    )
  }
}

