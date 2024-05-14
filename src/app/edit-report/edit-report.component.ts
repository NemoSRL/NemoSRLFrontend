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
  nome: string = '';
  qualita: string = '';
  qntMinima: number = 0;
  qnt: number = 0;
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
  /*editReport(): void{
    this.modalService.dismissAll()
    const updatedProduct: Report = {
      id: this.report?.id ?? -1, 
      nome: this.nome,
      qualita: this.qualita,
      sogliaminima: this.qntMinima,
      quantita: this.qnt
    };
    console.log(updatedProduct)
    t//his.productService.updateProdotto(updatedProduct).subscribe()
  
  }
  deleteProduct(): void{
    this.modalService.dismissAll()
    this.productService.deleteProdotto(this.product?.id ?? -1).subscribe()
  }*/
}
