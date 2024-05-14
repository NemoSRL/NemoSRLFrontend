import { Component, inject, TemplateRef, Input } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../Country';
@Component({
  selector: 'app-edit-prodotti',
  templateUrl: './edit-prodotti.component.html',
  styleUrl: './edit-prodotti.component.css'
})
export class EditProdottiComponent {
  @Input() country?: Country
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
}
